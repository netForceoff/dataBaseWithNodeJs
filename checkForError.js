function resetError(parent) {
    parent.className = '';
    if (parent.lastChild.className == 'error-message') {
      parent.removeChild(parent.lastChild);
    }
  }
  
  function showErorr(parent, text) {
    parent.className = 'error';
    let msgElem = document.createElement('span');
    msgElem.className = 'error-message';
    msgElem.innerHTML = text;
    parent.appendChild(msgElem);
  }