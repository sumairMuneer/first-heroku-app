import {firebase} from "./firebaseConfig";

const dealsRef = firebase
    .firestore()
    .collection("deals");

export const addDeal = (dealDetail) => {
    return new Promise(function (resolve, _reject) {

        dealDetail = {...dealDetail, isDeleted: false}
        dealsRef
            .add(dealDetail)
            .then((d) => {
                let newDealDetail = {...dealDetail, dealId: d.id}
                // let dealId=d.id
                updateDeal(newDealDetail).then()
                resolve({Deal: newDealDetail});
            })
            .catch(error => {
                alert(error);
                resolve({error});
            })
    }).catch(error => {
        // var errorCode = ErrorCode.serverError;
        // if (error.code === 'auth/email-already-in-use') {
        //     errorCode = ErrorCode.emailInUse;
        // }
        return ({error});
    });
}

// delete deal
export const deleteDeal = async (newDealDetail) => {

    let {dealId, isDeleted} = newDealDetail
    isDeleted = !isDeleted;
    const dataWithOnlineStatus = {
        ...newDealDetail,
        isDeleted,
        lastOnlineTimestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    // return await
    return await dealsRef.doc(dealId).update({...dataWithOnlineStatus});
}
// updateDeal
export const updateDeal = async (newDealDetail) => {

    let dealId = newDealDetail.dealId;
    const dataWithOnlineStatus = {
        ...newDealDetail,
        lastOnlineTimestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    // return await
    return await dealsRef.doc(dealId).update({...dataWithOnlineStatus});
}

export const fetchAllDeals = async () => {
    let p = new Promise(function (resolve, _reject) {
        let dealList = []
        dealsRef
            .onSnapshot(snapshot => {
                snapshot.forEach(doc => {
                    const dealObject = {dealId: doc.id, ...doc.data()}
                    // console.log(" data is ", dealObject)
                    dealList.push(dealObject)
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

export const fetchFullDeal = async (dealId) => {

    // const dealId = '9WX8SzhyHMq75b52XXWf';

    let p = new Promise(function (resolve, _reject) {
        dealsRef
            .onSnapshot(snapshot => {
                snapshot.forEach(doc => {
                    if (doc.id === dealId) {
                        // console.log(" deal data is ", doc.data())
                        resolve(doc.data());
                    }
                    // const dealObject = {docId: doc.id, ...doc.data()}
                    // console.log(" data is ", dealObject)
                    // dealList.push(dealObject)
                })

            })
    })
        .catch(error => {
            // var errorCode = ErrorCode.serverError;
            // if (error.code === 'auth/email-already-in-use') {
            //     errorCode = ErrorCode.emailInUse;
            // }
            console.log(" error is ", error)
            return ({error});
        });
    return p;
}
// firebase
//     .firestore()
//     .collection("universal_saved_listings")
// .where("user_id", "==", this.props.user.id)
