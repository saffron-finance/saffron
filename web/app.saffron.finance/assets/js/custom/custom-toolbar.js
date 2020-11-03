/*
-------------------------------
    : Custom - Toolbar js :
-------------------------------
*/
"use strict";
$(document).ready(function(){    
    /* -- Toolbar - Primary -- */   
    $('#primary-toolbar').toolbar({
      content: '#primary-toolbar-options',
      style: 'primary'
    });
    /* -- Toolbar - Secondary -- */   
    $('#secondary-toolbar').toolbar({
      content: '#secondary-toolbar-options',
      style: 'secondary'
    });
    /* -- Toolbar - Success -- */   
    $('#success-toolbar').toolbar({
      content: '#success-toolbar-options',
      style: 'success'
    });
    /* -- Toolbar - Danger -- */   
    $('#danger-toolbar').toolbar({
      content: '#danger-toolbar-options',
      style: 'danger'
    });
    /* -- Toolbar - Warning -- */   
    $('#warning-toolbar').toolbar({
      content: '#warning-toolbar-options',
      style: 'warning'
    });
    /* -- Toolbar - Info -- */   
    $('#info-toolbar').toolbar({
      content: '#info-toolbar-options',
      style: 'info'
    });
    /* -- Toolbar - Light -- */   
    $('#light-toolbar').toolbar({
      content: '#light-toolbar-options',
      style: 'light'
    });
    /* -- Toolbar - Dark -- */   
    $('#dark-toolbar').toolbar({
      content: '#dark-toolbar-options',
      style: 'dark'
    });
    /* -- Toolbar - Top -- */   
    $('#top-toolbar').toolbar({
      content: '#top-toolbar-options', 
      position: 'top',
      style: 'primary'
    });
    /* -- Toolbar - Right -- */   
    $('#right-toolbar').toolbar({
      content: '#right-toolbar-options', 
      position: 'right',
      style: 'success'
    });
    /* -- Toolbar - Bottom -- */   
    $('#bottom-toolbar').toolbar({
      content: '#bottom-toolbar-options', 
      position: 'bottom',
      style: 'danger'
    });
    /* -- Toolbar - Left -- */   
    $('#left-toolbar').toolbar({
      content: '#left-toolbar-options', 
      position: 'left',
      style: 'warning'
    });
    /* -- Toolbar - On Click -- */   
    $('#onclick-toolbar').toolbar({
      content: '#onclick-toolbar-options', 
      event: 'click',
      style: 'info'
    });
    /* -- Toolbar - Standard -- */   
    $('#standard-toolbar').toolbar({
      content: '#standard-toolbar-options',
      style: 'primary',
      animation: 'standard',
    });
    /* -- Toolbar - Flip -- */   
    $('#flip-toolbar').toolbar({
      content: '#flip-toolbar-options',
      style: 'success',
      animation: 'flip'
    });
    /* -- Toolbar - Grow -- */   
    $('#grow-toolbar').toolbar({
      content: '#grow-toolbar-options',
      style: 'danger',
      animation: 'grow'
    });
    /* -- Toolbar - Flyin -- */   
    $('#flyin-toolbar').toolbar({
      content: '#flyin-toolbar-options',
      style: 'warning',
      animation: 'flyin'
    });
    /* -- Toolbar - Bounce -- */   
    $('#bounce-toolbar').toolbar({
      content: '#bounce-toolbar-options',
      style: 'info',
      animation: 'bounce'
    });
});