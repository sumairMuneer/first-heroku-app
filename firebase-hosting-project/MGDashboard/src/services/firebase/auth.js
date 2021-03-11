import {firebase} from "./firebaseConfig";

const usersRef = firebase
    .firestore()
    .collection("users");

export const register = (userDetails) => {
    const {firstName, lastName, email, password, role, dealType} = userDetails;
    return new Promise(function (resolve, _reject) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                const timestamp = firebase.firestore.FieldValue.serverTimestamp();
                const uid = response.user.uid;
                const data = {
                    // id: uid,
                    userId: uid, // legacy reasons
                    email,
                    firstName,
                    lastName,
                    role,
                    dealType,
                    isDeleted: false,
                    userVisited: false,
                    createdAt: timestamp,
                };
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        resolve({user: data});
                    })
                    .catch(error => {
                        alert(error);
                        resolve({error});
                    })
            })
            .catch(error => {
                // var errorCode = ErrorCode.serverError;
                // if (error.code === 'auth/email-already-in-use') {
                //     errorCode = ErrorCode.emailInUse;
                // }
                resolve({error});
            });
    });
};

export const loginWithEmailAndPassword = async (email, password) => {
    return new Promise(function (resolve, reject) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const uid = response.user.uid;
                const userData = {
                    email,
                    id: uid
                };
                usersRef
                    .doc(uid)
                    .get()
                    .then(function (firestoreDocument) {
                        if (!firestoreDocument.exists) {
                            resolve({errorCode: "no user exists"});
                            return;
                        }
                        const user = firestoreDocument.data();
                        const newUserData = {
                            ...userData,
                            ...user
                        };
                        resolve({user: newUserData});
                    })
                    .catch(function (_error) {
                        console.log("_error  is ", _error)
                        resolve({error:'Server Error'});
                        // resolve({_error});
                    });
            })
            .catch(error => {
                var errorCode = 'serverErrorInitial';
                switch (error.code) {
                    case 'auth/wrong-password':
                        errorCode = 'invalidPassword';
                        break;
                    case 'auth/network-request-failed':
                        errorCode = 'serverError';
                        break;
                    case 'auth/user-not-found':
                        errorCode = 'noUser';
                        break;
                    default:
                        errorCode = 'serverError';
                }
                resolve({error: errorCode});
            });
    });
};

export const updateUser = async (newData) => {

    let userID = newData.userId || newData.userID;

    // let lastOnlineTimestamp = firebase.firestore.FieldValue.serverTimestamp()
    let lastOnlineTimestamp = firebase.firestore.FieldValue.serverTimestamp()
    const dataWithOnlineStatus = {
        ...newData,
        lastOnlineTimestamp
    }

    // return await
    let res = await usersRef.doc(userID).update({...dataWithOnlineStatus});

    return res;
}

export const logout = () => {
    return firebase.auth().signOut()
        .then(d => {

            return 1
        })
        .catch(d => {

            return 0
        });

};

export const fetchAllUser = async () => {
    let p = new Promise(function (resolve, _reject) {
        let dealList = []
        usersRef
            .onSnapshot(snapshot => {
                snapshot.forEach(doc => {
                    // const dealObject = {docId: doc.id, ...doc.data()}
                    // console.log(" data is ", dealObject)
                    dealList.push(doc.data())
                })
                resolve(dealList);
            })
        // .catch(error => {
        //     console.log(" data is ", error)
        //     // alert(error);
        //     // resolve({error});
        // })
    })
        .catch(error => {
            // var errorCode = ErrorCode.serverError;
            // if (error.code === 'auth/email-already-in-use') {
            //     errorCode = ErrorCode.emailInUse;
            // }
            console.log(" data is ", error)
            return ({error});
        });
    return p;
}

export const fetchUser = async (userId) => {
    let p = new Promise(function (resolve, _reject) {
        usersRef.where('id', '==', userId)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    resolve (doc.data())
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    })
        .catch(error => {
            // var errorCode = ErrorCode.serverError;
            // if (error.code === 'auth/email-already-in-use') {
            //     errorCode = ErrorCode.emailInUse;
            // }
            console.log(" data is ", error)
            return ({error});
        });
    return p;
}
