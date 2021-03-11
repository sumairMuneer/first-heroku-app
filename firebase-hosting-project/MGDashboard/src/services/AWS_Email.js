import AWS from 'aws-sdk'

export const sendAWSEmail = async (user) => {

    let p = new Promise(function (resolve, _reject) {
        const senderSource = 'info@techflo.io';
        // const adminEmail = 'sumair786186@gmail.com';
        const adminEmail = 'admin@matwagroup.com';
        const atifEmail = 'atif@matwagroup.com';

        if (user) {
            //admin email
            // User ${username} has asked for access to the deal flow room.
            const adminSubject = 'Request to access deal flow room from ' + user.firstName + '... ';
            const adminBody = "<html><body style='color:black'><p style='color:black' >Dear MG, </p>" +
                "<p style='color:black'>  User <b> " + user.firstName + ' ' + user.lastName + "</b> has asked for access to the  deal flow room. </p><br/>" +
                "<p style='color:black'>Have a decent day,<br/>" +
                "From your friendly deals flow platform</p>" +
                "</body></html>"

            AWS.config.update({
                accessKeyId: 'AKIAWC7Z2H67TJYDXFPF',
                secretAccessKey: 'zlpNpnJr9WS3XpGaNhTZpxkKmJNCrmlaHetZ2Hty',
                region: 'eu-central-1'
            });
            const ses = new AWS.SES({apiVersion: '2010-12-01'})

            //admin params
            const adminParams = {
                Destination: {
                    ToAddresses: [adminEmail, atifEmail]
                },
                ConfigurationSetName: '',
                Message: {
                    Body: {
                        Html: {
                            // HTML Format of the email
                            Charset: "UTF-8",
                            Data:
                            adminBody
                        }
                        ,
                        Text: {
                            Charset: "UTF-8",
                            Data: ""
                        }
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: adminSubject
                    }
                },
                Source: senderSource
            };

            // send mail to admin
            const sendAdminEmail = ses.sendEmail(adminParams).promise();
            sendAdminEmail.then(data => {
                console.log(" email send  to admin", data);
                resolve({msg: 'Request is placed to admin. '});
                return true;
            })
                .catch(err => {
                    console.log(" email error while sending email to admin ", err);
                    resolve({msg: ' Error while making request.  '});
                    return false;
                })

            // send mail to customer
            // const sendCustomerEmail = ses.sendEmail(customerParams).promise();
            // sendCustomerEmail.then(data => {
            //     console.log(" email send to customer", data);
            //     return true;
            // })
            //     .catch(err => {
            //         console.log(" email error while sending email to customer ", err);
            //         return false;
            //     })

        } else {
            resolve({msg: 'Error while making request. '});
            return false
        }
    })
        .catch(error => {
            return ({error});
        });
    return p;

}

