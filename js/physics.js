/*	DOCTYPE JS
	File:  physics.js
	Name: Kyle Marcoux
    Email: kyle_marcoux@student.uml.edu
    Umass Lowell 91.61 GUI Programming 1
    Created 8/09/20
    This is the javascript for scrabble, specifically the movement and 
	resetting of pieces
*/

// This handles the JQuery UI drag and drop 
$( function() {
	
	// This makes it so draggable elements revert if they arent placed in spaces
	$( ".draggable" ).draggable ({ 
		revert: 'invalid'
	});
	
	// This is the drop function for the non-multiplier spaces
	$( ".droppable" ).droppable ({
		drop: function( event, ui ) {

			$(this).append(ui.draggable.css('position','static'))
			var dragged = ui.draggable;
			var id = dragged.attr( "id" );
			var dropID = event.target.id;
			addLetter(id, dropID, 1);
			
			//var offset = dropID.offset();
			//$(id).offset({ top: offset.top, left: offset.left});
			
			switch(event.target.id){
				case "d1":
					$("#d2").droppable({disabled: false});
					break;
				case "d3":
					$("#d4").droppable({disabled: false});
					break;
				case "d4":
					$("#d5").droppable({disabled: false});
					break;
				case "d6":
					$("#d7").droppable({disabled: false});
					break;
				default:
					break;
			}
			    
			dragged.draggable({disabled: true});
			$(this).droppable( "disable" );
		}
	});
	
	// This is the drop function for the 2x-multiplier spaces
	$( ".droppable2x" ).droppable ({
		drop: function( event, ui ) {
			
			var dragged = ui.draggable;
			var id = dragged.attr( "id" );
			var dropID = event.target.id;
			addLetter(id, dropID, 2);
			
			switch(event.target.id){
				case "d2":
					$("#d3").droppable({disabled: false});
					break;
				case "d5":
					$("#d6").droppable({disabled: false});
					break;
				default:
					break;
			}
			
			dragged.draggable({disabled: true});
			$(this).droppable( "disable" );
		}
	});
	
	// These 3 functions make it so that upon clicking any of these buttons the tiles all return
	// to their original positions and also enable droppzones
	$( "#newHand" ).click(function() {
		$( ".draggable" ).css({ "top":"", "left":"" });
		$( ".draggable" ).draggable( "enable" );
		$( ".droppable" ).droppable( "enable" );
		$( ".droppable2x" ).droppable( "enable" );
		
	});
	$( "#resHand" ).click(function() {
		$( ".draggable" ).css({ "top":"", "left":"" });
		$( ".draggable" ).draggable( "enable" );
		$( ".droppable" ).droppable( "enable" );
		$( ".droppable2x" ).droppable( "enable" );
	});
	$( "#subWord" ).click(function() {
		$( ".draggable" ).css({ "top":"", "left":"" });
		$( ".draggable" ).draggable( "enable" );
		$( ".droppable" ).droppable( "enable" );
		$( ".droppable2x" ).droppable( "enable" );
	});
});

