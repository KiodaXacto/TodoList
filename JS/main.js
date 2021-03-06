//**The core sript of the application **//
//**Created by: Noureddine OUBOULLAH  **//

//SVG icons
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"> <g> <g> <path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3 c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9 C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7 c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2 c0.6,0,1.1,0.5,1.1,1.1V7z"/> </g> <g> <g> <path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/> </g> <g> <path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z" /> </g> <g> <path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8 C14.6,17.7,14.3,18,14,18z"/> </g> </g> </g> </svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"> <rect y="0" class="noFill" width="22" height="22"/> <g> <path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8 c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/> </g> </svg>';

//storing data in local storage
var Data = {
	toBeDone:[],
	Done:[]
};

setUp();
function setUp(){
	var Data = localStorage.getItem('Data')? JSON.parse(localStorage.getItem('Data')):{toBeDone:[],Done:[]};
	
	for(var i = 0; i < Data.toBeDone.length ; i++){
		addNewTask(Data.toBeDone[i],'toBeDone');
	}

	for(var i = 0; i < Data.Done.length ; i++){
		addNewTask(Data.Done[i],'Done');
	}
}


//input event listner
document.getElementById('task').addEventListener('keydown',function(e){
	if(e.code == 'Enter' && this.value){
		addNewTask(this.value);
		this.value = '';
	}
})

//Preparing the add button
var newTaskButton = document.getElementById("newTask");
newTaskButton.addEventListener('click',function () {
	var value = document.getElementById('task').value;
	document.getElementById('task').value = '';
	if(!value) return;

	addNewTask(value);
})

function removeTask(item){
	var taskToDelete = this.parentNode.parentNode;
	var parent = taskToDelete.parentNode;
	parent.removeChild(taskToDelete);
	var id = parent.id;
	var text = taskToDelete.innerText;
	if(id == 'Done'){
		Data.Done.splice(Data.Done.indexOf(text),1);
	}else{
		Data.toBeDone.splice(Data.toBeDone.indexOf(text),1);
	}
	localStorage.setItem('Data',JSON.stringify(Data));
}

function unset(){
	var taskToDelete = this.parentNode.parentNode;
	var parent = taskToDelete.parentNode;
	var target = parent.id == 'toBeDone' ?document.getElementById('Done'):document.getElementById('toBeDone');
	parent.removeChild(taskToDelete);
	target.insertBefore(taskToDelete,target.childNodes[0]);
	var id = parent.id;
	var text = taskToDelete.innerText;
	if(id == 'Done'){
		Data.Done.splice(Data.Done.indexOf(text),1);
		Data.toBeDone.push(text);
	}else{
		Data.toBeDone.splice(Data.toBeDone.indexOf(text),1);
		Data.Done.push(text);
	}
	localStorage.setItem('Data',JSON.stringify(Data));

}

function addNewTask(text, id){

	var parent = (id)?document.getElementById(id):document.getElementById('toBeDone');
	if(id == 'Done'){
		Data.Done.push(text);
	}else{
		Data.toBeDone.push(text);
	}
	
	localStorage.setItem('Data',JSON.stringify(Data));
	//creating the li instance
	var item = document.createElement('li');
	//injecting the value of the text into the list element
	item.innerText = text;

	//Creating the inner div
	var buttons = document.createElement('div');
	//adding the container class to the div 
	buttons.classList.add('buttons');

	//Creating the buttons
	var remove = document.createElement("button");
	remove.classList.add("remove");
	remove.innerHTML = removeSVG;

	var complete = document.createElement('button');
	complete.classList.add("complete");
	complete.innerHTML = completeSVG;


	//adding event listener to remove button
	remove.addEventListener('click',removeTask);
	//adding event listner to complete/redo button
	complete.addEventListener('click',unset);

	buttons.appendChild(remove);
	buttons.appendChild(complete);
	item.appendChild(buttons);
	parent.insertBefore(item,parent.childNodes[0]);

}