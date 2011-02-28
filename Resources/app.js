var win = Ti.UI.createWindow({
    backgroundImage:'images/background.png'
    });

var smstest = require('ti.sms');

var containerView = Ti.UI.createScrollView ({
    backgroundColor:'transparent',
    contentHeight:380,
    top:100,
    left:10,
    right:10
});
var logo = Ti.UI.createImageView({
    image:'images/logo.png',
    height:65,
    width:191,
    top:20
});
win.add(logo);

var info = Ti.UI.createImageView({
    image:'images/info.png',
    height:51,
    width:55,
    top:0,
    right:0
});
win.add(info);

var custName = Ti.UI.createTextField({
    top: 0,
    right:135,
    height:50,
    left:12,
    backgroundImage:'images/input.png',
    backgroundLeftCap: 10,
    backgroundTopCap:10,
    paddingLeft:10,
    color:'#666666',
    font:{fontWeight:'bold', fontSize:16}
});
containerView.add(custName);

var custLabel = Ti.UI.createLabel({
    top: 15,
    left:22,
    height:20,
    borderRadius:5,
    textAlign:'left',
    color:'#666666',
    text:'Your Name',
    font:{fontWeight:'bold', fontSize:16}
});
containerView.add(custLabel);

var resNumber = Ti.UI.createLabel({
    top: 0,
    width:100,
    height:50,
    right:15,
    backgroundImage:'images/input.png',
    backgroundLeftCap: 10,
    backgroundTopCap:10,
    backgroundPaddingLeft:12,
    color:'#666666',
    font:{fontWeight:'bold', fontSize:16}, 
    text:'Party Size'
});
containerView.add(resNumber);

var restName = Ti.UI.createLabel({
    top: 60,
    right:10,
    height:50,
    left:20,
    backgroundImage:'images/input.png',
    backgroundLeftCap: 10,
    backgroundTopCap:10,
    backgroundPaddingLeft:12,
    color:'#666666',
    font:{fontWeight:'bold', fontSize:16},
    text:'Select a Restaurant'
    
});

containerView.add(restName);

var resDate = Ti.UI.createLabel({
    top: 120,
    height:50,
    left:20,
    right:10,
    backgroundImage:'images/input.png',
    backgroundLeftCap: 10,
    backgroundTopCap:10,
    backgroundPaddingLeft:10,
    color:'#666666',
    font:{fontWeight:'bold', fontSize:16},
    text:'Date and Time'
});
containerView.add(resDate);


var resNotes = Ti.UI.createTextArea({
    top: 180,
    right:10,
    height:100,
    left:10,
    backgroundColor:'transparent',
    backgroundImage:'images/notes.png',
    backgroundLeftCap: 10,
    backgroundTopCap:10,
    paddingLeft:10,
    color:'#666666',
    font:{fontWeight:'bold', fontSize:16}
});
containerView.add(resNotes);

var notesLabel = Ti.UI.createLabel({
    top: 190,
    left:20,
    height:20,
    borderRadius:5,
    textAlign:'left',
    color:'#666666',
    text:'Reservation Notes',
    font:{fontWeight:'bold', fontSize:16}
});
containerView.add(notesLabel);

var send = Ti.UI.createButton({
    top: 290,
    backgroundImage:'images/textButtonUp.png',
    backgroundSelectedImage:'images/textButtonDown.png',
    height:45,
    right:71,
    left:10,
    font:{fontWeight:'bold', fontSize:18},
    color:'#fff',
    title:'Send Reservation'
});
containerView.add(send);

var friends = Ti.UI.createButton({
    top: 290,
    right:10,
    height:45,
    width:51,
    backgroundImage:'images/friends.png',
    backgroundSelectedImage:'images/friendsDown.png'
});
containerView.add(friends);

var call = Ti.UI.createButton({
    top: 66,
    right:20,
    height:38,
    width:38,
    backgroundImage:'images/call.png',
    visible:false
});
containerView.add(call);



var map = Ti.UI.createButton({
    top: 66,
    right:65,
    height:38,
    width:38,
    backgroundImage:'images/map.png',
    visible:false
});
containerView.add(map);

win.add(containerView);

win.open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});

call.addEventListener('click',function()
    {
        if (restName.text == 'Select a Restaurant')
            {
                 alert("Select a restaurant first");
            }
        else
            {
                if (restPhone == '')
                    {
                        Titanium.Platform.openURL('tel:'+smsnumber);
                    }
                else
                    {
                        Titanium.Platform.openURL('tel:'+restPhone);
                    }
            }
    });



var date = new Date();

currentDate = String.formatDate(date)+" at "+String.formatTime(date);

resDate.addEventListener('click', function(){
    var dateModal = Ti.UI.createWindow({ 
        backgroundImage:'images/background.png'
    });
    
    var dateBtn = Ti.UI.createButton({
        bottom: 20,
        backgroundImage:'images/textButtonUp.png',
        backgroundSelectedImage:'images/textButtonDown.png',
        height:45,
        width:280,
        font:{fontWeight:'bold', fontSize:18},
        color:'#fff',
        title:'Select Date'
    });
    
    var picker = Titanium.UI.createPicker({
        type:Titanium.UI.PICKER_TYPE_DATE_AND_TIME,
        //minDate: new Date(),
        minuteInterval:15
    });
    
    dateModal.add(picker);

    dateModal.add(dateBtn);
    
    picker.addEventListener('change',function(e){
        var date = e.value;
        var time = e.value;
        setTime = String.formatTime(time);
        setDate = String.formatDate(date);
        resDate.text = setDate+" at "+setTime;
    });
    
    dateBtn.addEventListener('click', function(){
        
        if (picker.value == null){
            resDate.text = currentDate;
        };
        
        dateModal.close({transition:Titanium.UI.iPhone.AnimationStyle.CURL_DOWN});
    
});
    
    dateModal.open({transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP});

});


resNumber.addEventListener('click', function(){
    var partyModal = Ti.UI.createWindow({ 
        backgroundImage:'images/background.png'
    });
    
    var partyBtn = Ti.UI.createButton({
        bottom: 20,
        backgroundImage:'images/textButtonUp.png',
        backgroundSelectedImage:'images/textButtonDown.png',
        height:45,
        width:280,
        font:{fontWeight:'bold', fontSize:18},
        color:'#fff',
        title:'Select Party Size'
    });
    
    var partyPicker = Titanium.UI.createPicker({
        type:Titanium.UI.PICKER_TYPE_PLAIN
    });

    var data = [];
        data[0]=Titanium.UI.createPickerRow({title:'Select your party size'});
        data[1]=Titanium.UI.createPickerRow({title:'1 person', value:'1'});
        data[2]=Titanium.UI.createPickerRow({title:'2 people', value:'2'});
        data[3]=Titanium.UI.createPickerRow({title:'3 people', value:'3'});
        data[4]=Titanium.UI.createPickerRow({title:'4 people', value:'4'});
        data[5]=Titanium.UI.createPickerRow({title:'5 people', value:'5'});
        data[6]=Titanium.UI.createPickerRow({title:'6 people', value:'6'});
        data[7]=Titanium.UI.createPickerRow({title:'7 people', value:'7'});
        data[8]=Titanium.UI.createPickerRow({title:'8 people', value:'8'});
        data[9]=Titanium.UI.createPickerRow({title:'9 people', value:'9'});
        data[10]=Titanium.UI.createPickerRow({title:'10 people', value:'10'});
        data[11]=Titanium.UI.createPickerRow({title:'11 people', value:'11'});
        data[12]=Titanium.UI.createPickerRow({title:'12 people', value:'12'});
        data[13]=Titanium.UI.createPickerRow({title:'Call for 13 or more... ', value:'Call'});
    
    partyPicker.add(data);
    
    partyModal.add(partyPicker);

    partyModal.add(partyBtn);
     
    partyPicker.addEventListener('change',function(e)
    {
    if (partyPicker.getSelectedRow(0).value=='Call')
        {
            if (restName.text == 'Select a Restaurant')
                        {
                            alert("For reservations over 12 please call the restaurant.  Select the restaurant you want to call from text2table.");
                        }
            else{
            
                var callDialog = Titanium.UI.createAlertDialog({
                    title: "Call "+restName.text+"!",
                    message: "Would you like to call "+restName.text+" to make a reservation now?",
                    buttonNames: ['Yes','No']
                });
    
                callDialog.addEventListener('click',function(e) 
                {
                if(e.index==0)
                    {
                    if (restName.text == 'Select a Restaurant')
                        {
                            alert("Select a restaurant first");
                        }
                    else  
                        {
                            if (restPhone == '')
                                {
                                    Titanium.Platform.openURL('tel:'+smsnumber);
                                }
                            else
                                {
                                    Titanium.Platform.openURL('tel:'+restPhone);
                                }
                        }
                    
                    }
        
                });
            callDialog.show();
            }
        }
   
    else 
        {
            resNumber.text = partyPicker.getSelectedRow(0).title;
        }
        Ti.API.info(partyPicker.getSelectedRow(0).title);

    });

    partyBtn.addEventListener('click', function(){
        partyModal.close({transition:Titanium.UI.iPhone.AnimationStyle.CURL_DOWN});
    });
    
    partyModal.open({transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP});

});

resNotes.addEventListener('change', function(){
    if (resNotes.value.length == 0){notesLabel.show();} else{notesLabel.hide();}
});

custName.addEventListener('change', function(){
    if (custName.value.length == 0){custLabel.show();} else{custLabel.hide();}
});
resNotes.addEventListener('focus', function(){
    win.animate({top:-80,duration:500});
});

resNotes.addEventListener('blur', function(){
    win.animate({top:0,duration:500});
});

info.addEventListener('click',function(){
    var infoDialog = Titanium.UI.createAlertDialog({
                        title: "Application Info",
                        message: "Make a reservation for your favorite restaurant via text.  Plus, receive special offers from participating businesses.  Just fill out your name, the size of your party (12 or less), pick a restaurant, pick a time and day and then make your reservation.  Special offers will pop up before sending your reservation if they are available.  If you have any questions or problems just call the restaurant by clicking the call button.  Enjoy your reservation!",
                        buttonNames: ['Thanks']
                    });
                    infoDialog.show();
});

function restaurantList (){

var restaurantModal = Ti.UI.createWindow({ 
    title:'Select a Restaurant',
    barColor:'#7d2515',
    modal:true
});

//Create Restaurants Table

var tableView = Titanium.UI.createTableView();
var tableData = [];

//Read from JSON 
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function(){
    var json = JSON.parse(this.responseText);
    if (!json) { 
        Titanium.API.info('Error - Null return!'); 
        return;
    }

//Build the table rows by looping through the JSON		
	
	for(var i=0; i<json.length; i++){
       var row = Ti.UI.createTableViewRow({
                    title: json[i].restaurant,
					hasChild:true,
					sms: json[i].smsnumber,
                    phone:json[i].phone,
					offer:json[i].offer,
                    location:json[i].location
                });
                    tableData.push(row);
            }

            Titanium.API.info(this.responseText);
	 		tableView.setData(tableData); 
        };
	
xhr.open('GET', 'http://winewebdesign.com/appcelerator/smsrestaurants.php');
xhr.send();

restaurantModal.add(tableView);

// create table view event listener
tableView.addEventListener('click', function(e){
    smsnumber = e.rowData.sms;
    restName.text = e.rowData.title;
    restPhone = e.rowData.phone;
    restOffer = e.rowData.offer;
    restLocation = e.rowData.location;
    call.visible = true;
    if (restLocation != ""){
        map.addEventListener('click',function(){
            Titanium.Platform.openURL(restLocation);
            });
        map.show();
    } else {map.hide();}
    
    restaurantModal.close({transition:Titanium.UI.iPhone.AnimationStyle.CURL_DOWN});
    win.show();
});

restaurantModal.open({transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP});

};

restName.addEventListener('click', restaurantList);

var sms = smstest.createSMSDialog();

send.addEventListener('click', function(){
    sms.toRecipients = [smsnumber];
    sms.barColor = '#7d2515';

    if (custName.value <= 0 || resNumber.text =='Party' ||restName.text=='Select a Restaurant' || resDate.text=='Date and Time')
        {
            alert("Please fill in all fields.");
        }
    
    else if (!sms.isSupported()) 
                {
                    alert("Can't send text from this device, but here's the contents:\n\nRestaurant SMS #:"+smsnumber+"\n\n Message\n"+restName.text+": "+custName.value+" would like a reservation for "+resNumber.text+" people on "+resDate.text+"\n~~~~\n"+resNotes.value);
                } 

    else
        {

            if(restOffer != '')
                {
                    var alertDialog = Titanium.UI.createAlertDialog({
                        title: restName.text+" Special!",
                        message: restOffer,
                        buttonNames: ['Accept','Decline']
                    });
    
                    alertDialog.addEventListener('click',function(e) {
                        if(e.index==0)
                            {
                                sms.messageBody = restName.text+" Reservation: \n"+custName.value+" would like a reservation for "+resNumber.text+" people on "+resDate.text+"\n~~Guest Notes~~\n"+resNotes.value+"\n~~Special Offer Accepted~~\n"+restOffer;
                                sms.open();
                            }
                        else 
                            {
                                sms.messageBody = restName.text+" Reservation: \n"+custName.value+" would like a reservation for "+resNumber.text+" people on "+resDate.text+"\n~~Guest Notes~~\n"+resNotes.value+"\n~~Special Offer Declined~~";
                                sms.open();
                            }
                    });
    
                    alertDialog.show();

                }
            else
                {
                    sms.messageBody = restName.text+" Reservation: \n"+custName.value+" would like a reservation for "+resNumber.text+" people on "+resDate.text+"\n~~Guest Notes~~\n"+resNotes.value;
                    sms.open();
                }

    }

 
});

friends.addEventListener('click', function(){
        sms.barColor = '#7d2515';

    if (custName.value <= 0 || resNumber.text =='Party' ||restName.text=='Select a Restaurant' || resDate.text=='Date and Time')
        {
            alert("Please fill in all fields.");
        }
    
    else if (!sms.isSupported()) 
                {
                    alert("Can't send text from this device, but here's the contents:\n\"Invitation from "+custName.value+"!\nWould you like to join me at "+restName.text+" on "+resDate.text+"?");
                } 

    else
        {
    
                    var alertDialog = Titanium.UI.createAlertDialog({
                        title: "Invite your Friends",
                        message: "Would you like to invite your friends to "+restName.text+" on "+resDate.text+"?",
                        buttonNames: ['Yes!','No Thanks']
                    });
    
                    alertDialog.addEventListener('click',function(e) {
                        if(e.index==0)
                            {
                                sms.messageBody = "Invitation from "+custName.value+"!\nWould you like to join me at "+restName.text+" on "+resDate.text+"?";
                                sms.open();
                            }
                    });
    
                    alertDialog.show();
        }
});


Ti.Gesture.addEventListener('orientationchange',function(e) { 
    if (e.orientation == Titanium.UI.LANDSCAPE_LEFT || e.orientation == Titanium.UI.LANDSCAPE_RIGHT)
    {
        logo.hide();
        containerView.animate({top:0,duration:500});
    } 

    else if (e.orientation == Titanium.UI.UPSIDE_PORTRAIT || e.orientation == Titanium.UI.PORTRAIT)
    {
        logo.show();
        containerView.animate({top:100,duration:500});
    }
});



