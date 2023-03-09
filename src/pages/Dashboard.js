import React, { useRef, useState, useEffect } from "react";
import { getProfiles } from "../services/DashboardServices";
import subscribeToContactEvents from "../functions/contactEvents";
import { Link } from "react-router-dom";
import Header from "../components/Header";
const Dashboard = () => {
  const divCCP = useRef(null);
  const [profiles, setProfiles] = useState([]);
  const [incomingNumber, setIncomingNumber] = useState("");
  const [contactId, setContactId] = useState("");
  const fetchData = async () => {
    let response = await getProfiles();
    setProfiles(response);
  };
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
      setIncomingNumber(contact.getAttributes().chatframework_VendorId.value);
    }

    function handleContactAccepted(contact) {
      console.debug(
        "CDEBUG >> ContactEvents.handleContactAccepted - Contact accepted by agent"
      );
      contact.getAttributes();
      setIncomingNumber(contact.getAttributes().chatframework_VendorId.value);
    }

    function handleContactConnecting(contact) {
      console.debug(
        "CDEBUG >> ContactEvents.handleContactConnecting() - Contact connecting to agent"
      );
      setIncomingNumber(contact.getAttributes().chatframework_VendorId.value);
    }

    function handleContactConnected(contact) {
      console.debug(
        "CDEBUG >> ContactEvents.handleContactConnected() - Contact connected to agent"
      );
      setIncomingNumber(contact.getAttributes().chatframework_VendorId.value);
    }

    function handleContactEnded(contact) {
      console.debug(
        "CDEBUG >> ContactEvents.handleContactEnded() - Contact has ended successfully"
      );
      setIncomingNumber("");
    }

    function handleContactDestroyed(contact) {
      console.debug(
        "CDEBUG >> ContactEvents.handleContactDestroyed() - Contact will be destroyed"
      );
      setIncomingNumber("");
    }

    function handleContactMissed(contact) {
      console.debug(
        "CDEBUG >> ContactEvents.handleContactMissed() - Contact was missed"
      );
    }
  }
  const init = () => {
    const ccpUrl = "https://demo-mairie-17.my.connect.aws/connect/ccp-v2";
    const connectRegion = "eu-west-2";
    window.connect.core.initCCP(divCCP.current, {
      ccpUrl: ccpUrl, // REQUIRED
      loginPopup: true, // optional, defaults to `true`
      loginPopupAutoClose: true, // optional, defaults to `false`
      loginOptions: {
        // optional, if provided opens login in new window
        autoClose: true, // optional, defaults to `false`
        height: 600, // optional, defaults to 578
        width: 400, // optional, defaults to 433
        top: 0, // optional, defaults to 0
        left: 0, // optional, defaults to 0
      },

      region: connectRegion, // REQUIRED for `CHAT`, optional otherwise
      softphone: {
        // optional, defaults below apply if not provided
        allowFramedSoftphone: true, // optional, defaults to false
        disableRingtone: false, // optional, defaults to false
        ringtoneUrl: "./ringtone.mp3", // optional, defaults to CCP’s default ringtone if a falsy value is set
      },
      pageOptions: {
        // optional
        enableAudioDeviceSettings: true, // optional, defaults to 'false'
        enablePhoneTypeSettings: true, // optional, defaults to 'true'
      },
      ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
      ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
      ccpLoadTimeout: 10000, //optional, defaults to 5000 (ms)
    });
    // window.connect.getLog().warn("CDEBUG >> CCP initialized");
    // Subscribe to Contact events
    window.connect.contact(subscribeToContactEvents);
  };

  const filterProfiles = (query, profiles) => {
    const q = query.toLowerCase().trim();
    return profiles.filter((p) => {
      const nameMatch = p.first_name.toLowerCase().includes(q);
      const phone = p.phone_number.toLowerCase().includes(q);
      const fbMatch = p.facebook_username.toLowerCase().includes(q);
      return nameMatch || fbMatch || phone;
    });
  };
  const [query, setQuery] = useState("");

  const filteredData = filterProfiles(query, profiles);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    init();
    fetchData();
  }, []);
  return (
    <div className="flex h-screen">
      <div className="w-3/4 px-10">
        <Header></Header>
        <div className="flex my-4 space-x-2">
          <input
            type="text"
            className="border border-gray-400 px-4 py-2 rounded-sm w-full"
            value={query}
            onChange={handleQueryChange}
            placeholder="Chercher Profil..."
          />
          {/* <Link to={"/create-profile"}>
            <button
              className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-sm"
              // onClick={createProfile}
            >
              Créer Profil
            </button>
          </Link> */}
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left uppercase">
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Numéro de téléphone</th>
              <th className="px-4 py-2">Compte Facebook</th>
              <th className="px-4 py-2">Last Contact Date</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              // .filter((profile) =>
              //   profile.name.toLowerCase().includes(searchQuery.toLowerCase())
              // )
              .map((profile, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 ${
                    incomingNumber === profile.phone_number
                      ? "bg-yellow-400"
                      : "bg-none"
                  }`}
                >
                  <td className="px-4 py-2">{profile.first_name}</td>
                  <td className="px-4 py-2">{profile.phone_number}</td>
                  <td className="px-4 py-2">{profile.facebook_username}</td>
                  <td className="px-4 py-2">{profile.created_at}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      // onClick={() => editProfile(index)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-1/4">
        <div className="h-full" ref={divCCP}></div>
      </div>
    </div>
  );
};

export default Dashboard;
