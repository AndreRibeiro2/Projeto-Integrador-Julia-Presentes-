    // Import the functions you need from the SDKs you need
    import {
      initializeApp
    } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
    import {
      getAuth,
      GoogleAuthProvider,
      signInWithPopup
    } from "https:www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
    import {
      getAnalytics
    } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
    import {
      getFirestore,
      collection,
      addDoc,
      doc,
      getDocs,
    } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    const firebaseConfig = {
      apiKey: "AIzaSyDtqMJPT6FfbTtSulkLXIQCEbObwsx_HH4",
      authDomain: "julia-presentes-2f3ba.firebaseapp.com",
      projectId: "julia-presentes-2f3ba",
      storageBucket: "julia-presentes-2f3ba.appspot.com",
      messagingSenderId: "316378211684",
      appId: "1:316378211684:web:df47688e130b73f1b64671",
      measurementId: "G-ZGQB8ZW254"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const fireStore = getFirestore(app);

    const dataBase = localStorage;

    export const auth = getAuth(app);

    export const contatoCollectionRef = collection(fireStore, "contato");

    export const signinGoogle = () => {
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider).then((result) => {

        const creadention = GoogleAuthProvider.credentialFromResult(result);
        const token = creadention.accessToken;
        const googleUser = result.user;

        // Captura o objeto pra transformar ele em string
        dataBase.setItem("usuario", JSON.stringify(googleUser));

        // Transforma o objeto de novo em objeto mostrando o nome do usuario
        const getUser = JSON.parse(dataBase.getItem("usuario"));
      })
    }

    export const getContacts = async () => {
      const data = await getDocs(contatoCollectionRef);
      const collections = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      console.log(collections);
    };

    export const mountContactObject = (name, surname, celphone, email, message) => {
      {
        const newObj = {
          name: name,
          email: email,
          mensagem: message,
          surname: surname,
          celular: celphone,
        };

        return newObj;
      }
    };

    export let toggleToast = false;

    export const postContacts = async (name, surname, celphone, email, message, toast) => {
      try {
        const contact = await addDoc(collection(fireStore, "contato"),
          mountContactObject(name, surname, celphone, email, message)
        );

        toast.show();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }