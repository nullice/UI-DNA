// $.evalFile(File($.fileName).path + "/Muclease_lib.jsx");
// $.evalFile(File($.fileName).path + "/Kinase_lib.jsx");




function initEnzymes(mucleasePath, KinasePath)
{
    $.evalFile(mucleasePath);
    $.evalFile(KinasePath);
    var mu = new Muclease();
    var ki = new Kinase();
}