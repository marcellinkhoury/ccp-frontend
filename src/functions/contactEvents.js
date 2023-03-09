function subscribeToContactEvents(contact) {
  console.debug(
    "CDEBUG >> ContactEvents - New Contact contactId: " + contact.contactId
  );
  console.debug(
    "CDEBUG >> ContactEvents - New Contact InitialContactId(): " +
      contact.getInitialContactId()
  );

  // Route to the respective handler
  contact.onIncoming(handleContactIncoming);
  contact.onAccepted(handleContactAccepted);
  contact.onConnecting(handleContactConnecting);
  contact.onConnected(handleContactConnected);
  contact.onEnded(handleContactEnded);
  contact.onDestroy(handleContactDestroyed);
  contact.onMissed(handleContactMissed);

  function handleContactIncoming(contact) {
    console.debug("CDEBUG >> ContactEvents.handleContactIncoming");
    console.warn(contact.getAttributes().chatframework_VendorId.value);
  }

  function handleContactAccepted(contact) {
    console.debug(
      "CDEBUG >> ContactEvents.handleContactAccepted - Contact accepted by agent"
    );
    contact.getAttributes();
    console.warn(contact.getAttributes().chatframework_VendorId.value);
  }

  function handleContactConnecting(contact) {
    console.debug(
      "CDEBUG >> ContactEvents.handleContactConnecting() - Contact connecting to agent"
    );
    console.warn(contact.getAttributes().chatframework_VendorId.value);
  }

  function handleContactConnected(contact) {
    console.debug(
      "CDEBUG >> ContactEvents.handleContactConnected() - Contact connected to agent"
    );
    console.warn(contact.getAttributes().chatframework_VendorId.value);
  }

  function handleContactEnded(contact) {
    console.debug(
      "CDEBUG >> ContactEvents.handleContactEnded() - Contact has ended successfully"
    );
    console.warn(contact.getAttributes().chatframework_VendorId.value);
  }

  function handleContactDestroyed(contact) {
    console.debug(
      "CDEBUG >> ContactEvents.handleContactDestroyed() - Contact will be destroyed"
    );
    // Add your custom code here
  }

  function handleContactMissed(contact) {
    console.debug(
      "CDEBUG >> ContactEvents.handleContactMissed() - Contact was missed"
    );
  }
}
