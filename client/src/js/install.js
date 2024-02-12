const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('hit')
  console.log("event" + event)
  event.preventDefault();
  window.deferredPrompt = event;

  //Remove the hidden class
  butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element--------------------------------
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  // console.log(promptEvent)
  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();     // Show prompt

  window.deferredPrompt = null; // Reset the deferred prompt variable, it can only be used once.

  butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event------------------------------------------------------
window.addEventListener('appinstalled', (event) => {
  // Clear prompt
  console.log('install hit')

  window.deferredPrompt = null;
});

