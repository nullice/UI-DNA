/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright (c) 2015 Adobe Systems Incorporated. All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

/*jslint vars: true, node: true, plusplus: true, devel: true, nomen: true, indent: 4, node: true */
"use strict";

var _ = require("underscore"),
    Q = require("q"),
    Path = require("path"),
    Backbone = require("backbone"),
    Errors = require("./errors.js"),
    PathUtils = require("shared/PathUtils"),
    path = require("path"),
    PreviewModel = require("./previewModel.js"),
    PreviewView = require("./previewView.js"),
    PSAlerts = require("./psAlerts.js"),
    ServerInterface = require("./serverInterface.js"),
    Headlights = require("./utils/Headlights"),
    Metadata = require("shared/Metadata"),
    FileDialog = require("./fileDialog.js"),
    Template = require("./TemplateLoader"),
    Strings = require("./LocStrings"),
    ActionRollup = require("./actionRollup.js"),
    JSXRunner = require("./JSXRunner"),
    HelpTextView = require("./HelpTextView.js"),
    DocinfoUtils = require("shared/DocinfoUtils"),
    UserSettings = require("shared/UserSettings"),
    ExportKind = require("./exportKind.js"),
    CremaGlobal = require("./cremaGlobal.js"),
    AssetSizeCollection = require("./assetSizeCollection.js"),
    GenableDialogView = require("./genableDialogView.js"),
    LayerCollectionView = require("./layerCollectionView.js"),
    AssetSizeCollectionView = require("./assetSizeCollectionView.js");

var DialogView = Backbone.View.extend({

    $spinner: Backbone.$(),
    $spinnerCursor: Backbone.$(),
    $fileSizeOverlay: Backbone.$(),
    $fileName: Backbone.$(),
    $previewLoadingSpinner: Backbone.$(),
    $exportBtn: Backbone.$(),
    zoomOverlayView: null,

    events: {
        "click .cancel-button": "cancelDialog",
        "click .extract-button": "extractLayerAssets",
        "mousemove .spinner": "updateSpinnerCursor",
        "mouseleave .spinner": "hideCursorOnMouseLeave"
    },

    initialize: function (options)
    {

        var generatorModel = options.generatorModel || new Backbone.Model();

        this.generatorModel = generatorModel;
        this.previewModel = new PreviewModel();
        this.assetSizeCollection = (generatorModel && generatorModel.generatorSettings && generatorModel.generatorSettings.assetSizeCollection) ||
            new AssetSizeCollection();
        this._UserSettings = new UserSettings(require("shared/UserSettings/SettingsFileInterface.js"));
        this.listenTo(this.previewModel, "change:srcModel change:loading", this.renderName);
        this.listenTo(this.previewModel, "change:srcModel", this.listenForLoading);
        this.listenTo(this.model, "change:exporting", this.renderSpinnerVisibility);
        this.listenTo(this.model, "change:exporting", this._updateExportingOnGeneratorModel);
        this.listenTo(this.generatorModel, "change:layerSettingsDisabled", this.renderExportButtonDisabledState);

        this.listenForLoading();
        if (CremaGlobal.window && CremaGlobal.window.document)
        {
            Backbone.$(CremaGlobal.window.document).keyup(this.handleDocKeyUp.bind(this));
        }
        this._footerTemplate = _.template(Template.loadTemplate("../templates/footerView.html"));
        this._spinnerTemplate = _.template(Template.loadTemplate("../images/Cur_Spinner_11_11.svg"));
        Metadata.init(JSXRunner);
    },

    renderExportButtonDisabledState: function ()
    {
        this.$exportBtn.prop("disabled", this.generatorModel.isExportDisabled());
    },

    _updateExportingOnGeneratorModel: function ()
    {
        this.generatorModel.set("exporting", this.model.get("exporting"));
    },

    renderAssetsView: function ()
    {
        if (!this.$assetsColumn)
        {
            this.$assetsColumn = this.$(".assets-column");
        }
        this.renderAssetsSizeView();
        this.renderLayerCollectionView();
    },

    renderAssetsSizeView: function ()
    {
        if (!this.assetSizeCollectionView)
        {
            var $assetSizesEl = Backbone.$(".asset-sizes");
            this.assetSizeCollectionView = new AssetSizeCollectionView({
                model: this.assetSizeCollection,
                el: $assetSizesEl
            });
        }

        this.assetSizeCollectionView.render();
    },

    renderLayerCollectionView: function ()
    {
        if (!this.layerCollectionView)
        {
            this.layerCollectionView = new LayerCollectionView({
                collection: this.generatorModel.layerCollection,
            });
        }

        Backbone.$(".dialog-assets.lists").append(this.layerCollectionView.render().$el);
        this.$assetsColumn.removeClass("hide");

        this.renderExportButtonDisabledState();
    },

    renderPreviewView: function ()
    {
        if (!this.previewView)
        {
            var $previewEl = Backbone.$(".preview");
            this.previewView = new PreviewView({
                model: this.previewModel,
                collection: this.generatorModel.layerCollection,
                el: $previewEl,
                generatorModel: this.generatorModel
            });
        }

        this.previewView.render();

        var widthClass = "canvas-multiple-layers",
            $frame = Backbone.$(".canvas-frame"),
            $canvas = Backbone.$(".canvas-centering-container");

        $frame.addClass(widthClass);
        $canvas.addClass(widthClass);
    },

    renderSettingsView: function ()
    {
        if (!this.genableDialogView)
        {
            this.genableDialogView = new GenableDialogView({
                el: Backbone.$(".dialog-settings"),
                collection: this.generatorModel.layerCollection
            });
        }
        this.genableDialogView.render();
        this.renderHelpText();
    },

    handleDocKeyUp: function (e)
    {
        var $target = Backbone.$(e.target);
        if ($target.is("select"))
        {
            return;
        }
        if (e.which === 13)
        { //enter
            if (!$target.is("input") && this.generatorModel.layerCollection.hasDisplayableItems())
            {
                this.extractLayerAssets();
            }
        } else if (e.which === 27)
        {// esc
            this.cancelDialog();
        }
    },

    cancelDialog: function ()
    {
        Headlights.logEvent(Headlights.CREMA_ACTION, Headlights.DLG_CLICK_CANCEL);
        Headlights.logAccumulatedData(Headlights.CANCEL_SUMMARY_GROUP);
        if (this.previewView.$el.hasClass("loading"))
        {
            Headlights.logEvent(Headlights.CREMA_ACTION, Headlights.DLG_CANCEL_WHILE_LOADING);
        }
        var docId = this.generatorModel.get("docId");
        CremaGlobal.csInterface.closeExtension();
    },

    persistUsersActions: function ()
    {
        return ActionRollup.apply();
    },

    saveDialogSettings: function (genableModel)
    {
        if (!genableModel)
        {
            return;
        }

        var generatorSettings = {},
            assetSizeArray = [],
            defaultSettings = {
                extension: genableModel.get("extension"),
                quality: genableModel.get("quality"),
                interpolationType: genableModel.get("interpolationType"),
                metadataType: genableModel.get("metadataType"),
                useICCProfile: genableModel.get("useICCProfile")
            };

        this.assetSizeCollection.each(function (assetSizeModel)
        {
            assetSizeArray.push({
                scale: assetSizeModel.get("scale"),
                suffix: assetSizeModel.get("suffix")
            });
        });

        generatorSettings.docSettings = defaultSettings;
        generatorSettings.assetSizes = assetSizeArray;

        ActionRollup.serializeDocGeneratorSettings(generatorSettings);
        this._setDefaultSettings(defaultSettings);
    },

    logExportEvent: function (headlightsEvent, numberExported, seconds)
    {
        var exportKind = this.generatorModel.get("exportKind");

        if (this.generatorModel.layerCollection)
        {
            this.generatorModel.layerCollection.logExportedAssetData(exportKind, seconds);
        }
        if (this.assetSizeCollection)
        {
            this.assetSizeCollection.logAssetSizesData();
        }
        Headlights.logEvent(Headlights.CREMA_ACTION, headlightsEvent);
        if (numberExported)
        {
            switch (exportKind)
            {
                case ExportKind.Document:
                    Headlights.logEvent(Headlights.CREMA_FUNNEL, Headlights.DLG_EXPORT_FOR_DOCUMENT_DONE);
                    break;
                case ExportKind.DocumentWithArtboards:
                    Headlights.logEvent(Headlights.CREMA_FUNNEL, Headlights.DLG_EXPORT_FOR_DOCUMENT_ARTBOARDS_DONE + numberExported);
                    break;
                default:
                    Headlights.logEvent(Headlights.CREMA_FUNNEL, Headlights.DLG_EXPORT_FOR_SELECTION_DONE + numberExported);
                    break;
            }
        }
    },

    saveAndCloseDialog: function ()
    {
        var docId = this.generatorModel.get("docId");
        Headlights.logEvent(Headlights.CREMA_ACTION, Headlights.CLICK_DONE);
        this.persistUsersActions().then(function ()
        {
            this.logExportEvent(Headlights.FINISH_DONE);
            CremaGlobal.csInterface.closeExtension();
        }.bind(this));
    },

    render: function ()
    {
        this.renderFooter();
        this.renderSubViews();
        this.cacheElements();
        this.renderName();
        this.renderExportButtonDisabledState();
        this.renderSpinner();
        this.renderLoading();
        return this;
    },

    cacheElements: function ()
    {
        this.$fileSizeOverlay = this.$(".file-size-overlay-container");
        this.$fileName = this.$(".preview-file-name");
        this.$previewLoadingSpinner = this.$(".preview-loading-spinner");
        this.$exportBtn = this.$(".extract-button");
    },
    renderFooter: function ()
    {
        var context;

        if (!this.$elFooter)
        {
            this.$elFooter = this.$("footer");
        }
        context = Template.createTemplateContext(Strings, {});
        this.$elFooter.html(this._footerTemplate(context));
    },

    renderSpinner: function ()
    {
        var context = Template.createTemplateContext(Strings, {});
        this.$spinner = Backbone.$("<div></div>").addClass("spinner spinner-cursor-area");
        this.$spinnerCursor = Backbone.$("<div></div>").addClass("spinner-cursor").appendTo(this.$spinner);
        this.$spinnerCursor.html(this._spinnerTemplate(context));
        this.$previewLoadingSpinner.append(this._spinnerTemplate(context));
        this.renderSpinnerVisibility();
        this.$el.append(this.$spinner);
    },

    renderSpinnerVisibility: function ()
    {
        var show = this.model.get("exporting") || false;
        this.$spinner.toggleClass("hide", !show);
    },

    updateSpinnerCursor: function (e)
    {
        this.$spinnerCursor.show().offset({top: e.clientY, left: e.clientX});
    },

    hideCursorOnMouseLeave: function ()
    {
        this.$spinnerCursor.hide();
    },

    renderSubViews: function ()
    {
        this.renderPreviewView();
        this.renderAssetsView();
        this.renderSettingsView();
    },

    renderHelpText: function ()
    {
        if (!this.$help)
        {
            this.$help = this.$(".help");
            this.helpText = new HelpTextView({});
        }
        this.$help.append(this.helpText.render().$el);
    },

    renderName: function ()
    {
        var layerModel = this.previewModel.get("layerModel"),
            name = layerModel && layerModel.get("name") || "",
            hide = !name;
        this.$fileSizeOverlay.toggleClass("hide", hide);
        this.$fileName.text(name);
    },

    listenForLoading: function ()
    {
        if (this.curSrcModel)
        {
            this.stopListening(this.curSrcModel);
        }
        this.curSrcModel = this.previewModel.get("srcModel");
        if (this.curSrcModel)
        {
            this.listenTo(this.curSrcModel, "change:loading", this.renderLoading);
        }
        this.renderLoading();
    },

    renderLoading: function ()
    {
        var srcModel = this.previewModel.get("srcModel"),
            loading = srcModel && srcModel.get("loading") || false;
        this.$fileSizeOverlay.toggleClass("loading", loading);
    },

    createExportComponent: function (genableModel, documentId, layerId, filePath, scale, suffix)
    {
        return genableModel.createExportComponent(documentId, layerId, filePath, scale, suffix);
    },

    createExportComponentsFromLayer: function (documentId, layerModel)
    {
        //Prune list so that we do not cross MaxSize Limit.
        var exportableAssetSizeCollection = this.assetSizeCollection.filter(function (assetSizeModel)
        {
            var scale = assetSizeModel.get("scale"),
                maxExceeded = layerModel.scaleExceedMaxImageLimit(scale);
            if (maxExceeded)
            {
                Headlights.logEvent(Headlights.CREMA_WARNING, Headlights.MAX_EXCEEDED_ASSETSCALE);
                Headlights.logData(Headlights.MAX_EXCEEDED_GROUP, Headlights.MAX_EXCEEDED_ASSETSCALE, scale);
            }
            return !maxExceeded;
        });

        return _.map(exportableAssetSizeCollection, function (assetSizeModel)
        {
            return this.createExportComponent(layerModel.layerSettings, documentId, layerModel.get("layerId"), "", assetSizeModel.get("scale"), assetSizeModel.get("suffix"));
        }.bind(this));
    },

    getExportableLayers: function (allLayers, logHeadlights)
    {
        return allLayers.filter(function (layer)
        {
            var retVal = true,
                headlightsEvent;

            if (layer.get("artboardEmpty"))
            {
                headlightsEvent = Headlights.ARTBOARD_EMPTY_DLG_EXP;
                retVal = false;
            } else if (layer.get("groupEmpty"))
            {
                headlightsEvent = Headlights.GROUP_EMPTY_DLG_EXP;
                retVal = false;
            } else if (layer.get("layerEmpty"))
            {
                headlightsEvent = Headlights.LAYER_EMPTY_DLG_EXP;
                retVal = false;
            } else if (layer.get("outsideDocumentBounds"))
            {
                headlightsEvent = Headlights.LAYER_OUTSIDE_DOC_DLG_EXP;
                retVal = false;
            } else if (layer.get("clippedByDocumentBounds"))
            {
                headlightsEvent = Headlights.LAYER_CLIPPEDBY_DOC_DLG_EXP;
            } else if (layer.get("clippedByArtboardBounds"))
            {
                headlightsEvent = Headlights.LAYER_CLIPPEDBY_ARTBOARD_DLG_EXP;
            }

            if (logHeadlights && headlightsEvent)
            {
                Headlights.logEvent(Headlights.CREMA_ACTION, headlightsEvent);
            }
            return retVal;
        });
    },

    createQuickExportComponents: function ()
    {
        var docId = this.generatorModel.get("docId"),
            exportableItems = this.getExportableLayers(this.generatorModel.layerCollection, true),
            createComponentsForDoc = _.partial(this.createExportComponentsFromLayer, docId),
            quickExportComponents = _.flatten(exportableItems.map(createComponentsForDoc, this));

        return quickExportComponents;
    },

    updateQuickExportComponentPaths: function (quickExportComponents)
    {
        var docFileBaseName = this.generatorModel.get("docFileBaseName"),
            docFileDirectory = this.generatorModel.get("docFileDirectory");

        docFileDirectory = this._UserSettings.get(this.generatorModel.get("docFilepath")) || docFileDirectory;

        JSXRunner.runRawJSX("app.bringToFront();");
        if (quickExportComponents.length === 1)
        {
            var component = _.first(quickExportComponents);
            return FileDialog.promptForExportFile(docFileBaseName, component.basename, component.extension, docFileDirectory).then(function (filepath)
            {
                JSXRunner.runRawJSX("app.bringToFront();");
                component.path = filepath;
                this._stashDirSetting(path.dirname(filepath));
                return quickExportComponents;
            }.bind(this), function (err)
            {
                return Q.reject(err);
            });
        }

        return FileDialog.promptForExportDirectory(docFileBaseName, docFileDirectory).then(function (destFolder)
        {
            JSXRunner.runRawJSX("app.bringToFront();");
            _.each(quickExportComponents, function (component)
            {
                component.path = PathUtils.buildPath(destFolder, component.basename, component.extension);
            }, this);
            this._stashDirSetting(destFolder);
            return quickExportComponents;
        }.bind(this), function (err)
        {
            return Q.reject(err);
        });
    },

    getCurrentPreviewSettingsModel: function ()
    {
        return this.previewModel.get("layerModel").getActivePreview();
    },
    _stashDirSetting: function (destFolder)
    {
        this._UserSettings.setCachedValue(this.generatorModel.get("docFilepath"), destFolder);
    },
    _setDefaultSettings: function (defaultSettings)
    {
        return ServerInterface.sendCommand("setDefaultSettings", {
            defaultSettings: defaultSettings
        })
            .catch(function (e)
            {
                CremaGlobal.window.console.error("Error in ServerInterface.sendCommand(\"setDefaultSettings\"):", e);
            });
    },

    extractLayerAssets: function ()
    {
        Headlights.logEvent(Headlights.CREMA_ACTION, Headlights.DLG_CLICK_EXPORT);
        var docId = this.generatorModel.get("docId"),
            quickExportComponents = this.createQuickExportComponents(),
            currentPreviewGenableModel = this.getCurrentPreviewSettingsModel(),
            shouldClose = true,
            startTime,
            numExported,
            onError = function (e)
            {
                if (e && e.message === "cancel")
                {
                    // User canceled the export. Keep the dialog open.
                    shouldClose = false;
                } else if (e instanceof Errors.UserFacingError)
                {
                    // There was an expected error we need to show the user. Keep the dialog open so they can fix it.
                    shouldClose = false;
                    return PSAlerts.alert(e.message);
                } else if (e instanceof Errors.UserFacingErrorNotFixable)
                {
                    // There was an expected error we need to show the user, but they can't fix it, so don't keep the dialog open.
                    return PSAlerts.alert(e.message);
                } else
                {
                    // Uh oh, we didn't expect this error.
                    CremaGlobal.window.console.warn("Error in extractLayerAssets: " + e && e.message);
                }
            }.bind(this),
            hasMetadata = function (component)
            {
                return (component.metadataType !== undefined && component.metadataType !== "none");
            },
            writeAllMetadata = function (metadata)
            {
                Q.allSettled(_.map(quickExportComponents, function (component)
                {
                    if (hasMetadata(component))
                    {
                        return Metadata.writeMetadata(component.path, metadata);
                    }
                    return Q.resolve();
                }));
            }.bind(this),
            handleMetadata = function (result)
            {
                numExported = result ? result.length : 0;
                if (numExported)
                {
                    // do any need metadata?
                    if (_.some(quickExportComponents, hasMetadata))
                    {
                        return (
                            Metadata.readMetadata()
                                .then(writeAllMetadata)
                                .catch(function (e)
                                {
                                    Headlights.logEvent(Headlights.CREMA_ACTION, Headlights.METADATA_READERROR);
                                    return onError(new Errors.MetadataError());
                                })
                        );
                    }
                }
            }.bind(this),
            exportFinished = function ()
            {
                var stopTime = new Date().getTime(),
                    secondsToTenths = Math.round((stopTime - startTime) / 100) / 10;

                if (numExported)
                {
                    this.logExportEvent(Headlights.DLG_FINISH_EXPORT, numExported, secondsToTenths);
                }
            }.bind(this),
            exportComponents = function (quickExportComponents)
            {
                this.model.set("exporting", true);
                startTime = new Date().getTime();
                return ServerInterface.sendCommand("exportComponents", {components: quickExportComponents})
                    .catch(function (e)
                    {
                        if (/WriteError/.test(e))
                        {
                            Headlights.logEvent(Headlights.CREMA_ACTION, Headlights.WRITEERROR_ON_DLG_EXPORT);
                            throw new Errors.FSWriteError(Path.dirname(_.first(quickExportComponents).path));
                        }

                        // Don't stop the export workflow if there was a silent error during asset generation (e.g. user
                        // tried to export an empty layer).
                        CremaGlobal.window.console.warn("Error in exportComponents: " + e);
                    }.bind(this));
            }.bind(this),
            commitSave = function ()
            {
                this.saveDialogSettings(currentPreviewGenableModel);
                return this.persistUsersActions();
            }.bind(this),
            closeIfNeeded = function ()
            {
                this.model.set("exporting", false);

                if (shouldClose)
                {
                    CremaGlobal.csInterface.closeExtension();
                } else
                {
                    JSXRunner.runRawJSX("app.bringToFront();");
                }
            }.bind(this);

        if (!quickExportComponents || quickExportComponents.length === 0)
        {
            shouldClose = false;
            PSAlerts.alert(Strings.ALERT_NO_ASSETS_TO_EXPORT);
            return closeIfNeeded();
        }

        return this.updateQuickExportComponentPaths(quickExportComponents)
            .then(exportComponents)
            .then(handleMetadata)
            .then(exportFinished)
            .then(commitSave)
            .catch(onError)
            .finally(closeIfNeeded);
    }
});

module.exports = DialogView;
