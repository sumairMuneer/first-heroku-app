    import {storage} from "./firebaseConfig";

export const uploadFile = async file => {

    // return new Promise((resolve, reject) => {
    return new Promise(async (resolve, _reject) => {

        const uploadTask = storage.ref(`/images/${file.name}`).put(file)
        await uploadTask.on('state_changed',
            snapshot => {
                console.log(" snapshot ")
            },
            error => {
                console.log(" error ")
                resolve({error})
            },
            () => {
                console.log(" success ");
                storage.ref('images').child(file.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        console.log(" firebase url ", fireBaseUrl)
                        resolve({msg: `file is uploaded with url ${fireBaseUrl}`})
                    })
            }
        )
    })
}
