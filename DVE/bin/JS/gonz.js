

gonzPersistent()

function gonzPersistent() {
	
	var cs= new CSInterface();
	var event = new CSEvent();//创建一个事件
	event.type = "com.adobe.PhotoshopPersistent"; //注册持久化运行事件
	event.scope = "APPLICATION";
	event.extensionId = cs.getExtensionID(); 
	cs.dispatchEvent(event); 
}


function gonzUnPersistent() {
	
	var cs= new CSInterface();
	var event = new CSEvent();//创建一个事件
	event.type = "com.adobe.PhotoshopUnPersistent"; //注册持久化运行事件
	event.scope = "APPLICATION";
	event.extensionId = cs.getExtensionID(); 
	cs.dispatchEvent(event); 
}