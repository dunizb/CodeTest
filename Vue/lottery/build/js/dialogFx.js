;( function( window ) {
	
	'use strict';
	
	function DialogFx( el, options ) {
		this.el = $(el);
		this.options = $.extend( {}, this.options );
		$.extend( this.options, options );
		this.ctrlClose = this.el.find( '[data-dialog-close]' );
		this.isOpen = false;
		this._initEvents();
	}

	DialogFx.prototype.options = {
		// callbacks
		onOpenDialog : function() { return false; },
		onCloseDialog : function() { return false; }
	}

	DialogFx.prototype._initEvents = function() {
		var self = this;
		this.ctrlClose.on( 'click', this.toggle.bind(this) );
		this.el.find( '.tan-overlay' ).on( 'click', this.toggle.bind(this) );
	}

	DialogFx.prototype.toggle = function() {
		var self = this;
		if( this.isOpen ) {
			this.el.removeClass('tan-open');
			this.options.onCloseDialog( this );
		}
		else {
			this.el.addClass('tan-open');
			this.options.onOpenDialog( this );
		}
		this.isOpen = !this.isOpen;
	};
    
	DialogFx.prototype.openD = function(){
		if(this.el.hasClass('tan-open')){
			return false;
			}
			else{
				this.el.addClass('tan-open');
				}
		this.isOpen = !this.isOpen;
		}
		
		DialogFx.prototype.closeD = function(){
		if(this.el.hasClass('tan-open')){
			this.el.removeClass('tan-open');
			}
			
		this.isOpen = !this.isOpen;
		}
	window.DialogFx = DialogFx;

})( window );