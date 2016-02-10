'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	$.get('/project/' + idNumber, addProject);
	console.log("project/" + idNumber);
}

function addProject(proj) { 
	console.log(proj); 
	var projLink = '<a href="#" class="thumbnail">' +
			'<img src="' + proj['image'] + '" class="detailsImage">' +
			'<p><small>' + proj['title'] + '</small></p>' +
			'<p><small>' + proj['date'] + '</small></p></a>';
	//$('proj .details').html('foo'); //keeps adding to all projects??
	$('#project' + proj['id'] + '.details').html(projLink + proj['summary']);
	}
/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette", changeColor);
}

function changeColor(result) { 
	var colors = result['colors']['hex'];
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}