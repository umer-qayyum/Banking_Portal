 // Function to store user data in local storage
 function storeUserData(email, password, number, name,photo) {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = { email, password, number, name ,photo};
    existingUsers.push(user);
    localStorage.setItem('users', JSON.stringify(existingUsers));
}

// Function to check if the email and password match with the stored data
function checkLogin(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    return user ? user : null;
   
}

// Function to show the user portal
function showUserPortal(user) {
    console.log(user.email);
    document.getElementById('loginForm').style.display = 'none';
    const total = JSON.parse(localStorage.getItem('total')) || [];
    let portal=document.getElementById('userPortal');
    document.getElementById('main').style.backgroundColor="#343541";
    portal.innerHTML+=`
    <div class="container " >
    <div class="box" style="padding: 20px;  color:#343541;
    background-color: white; ">
        <div class="row d-flex justify-content-around">
            <div class="col-lg-3 border pb-5" style="border-radius: 20px;  color: white;
            background-color:  #343541;">
                <h4 class="mt-5 border" style="padding: 15px;color:#343541;
                background-color: white;">Welcome to your Account</h4>
                <img src="${user.photo}">
                <p class="mt-3">${user.name}</p>
                <p class="mt-1">${user.number}</p>
                <div class="icon d-flex border" style="padding: 15px 10px 10px 10px; color:#343541;
                background-color: white;">
                    <i style="margin:10px 15px 0px 0px ;" class="fa-solid fa-icons fa-xl"></i>
                    <h6 >My Icons</h6>
                </div>
                <div class="settings d-flex border mt-3" style="padding: 15px 10px 10px 10px; color:#343541;
                background-color: white;">
                    <i style="margin:10px 15px 0px 0px ;" class="fa-solid fa-gears fa-xl"></i>
                    <h6 >Settings</h6>
                </div>
                <div class="Forms d-flex border mt-3" style="padding: 15px 10px 10px 10px;color:#343541;
                background-color: white;">
                    <i style="margin:10px 15px 0px 0px ;" class="fa-brands fa-wpforms fa-xl"></i>
                    <h6 >Forms</h6>
                </div>
                <div class="FAQs d-flex border mt-3" style="padding: 15px 10px 10px 10px; color:#343541;
                background-color: white;">
                    <i style="margin:10px 15px 0px 0px ;" class="fa-solid fa-sliders fa-xl"></i>
                    <h6 >FAQs</h6>
                </div>
                <a href="login.html" class="btn btn-outline-success mt-4">log out</a>
            </div>
            <div class="col-lg-8 border" style="border-radius: 20px; color: white;
            background-color:  #343541;">
                <div id="totalCashed" class="total d-flex justify-content-center border mt-5 mb-4"style="padding:20px 0px;border-radius: 20px;color:#343541;
                background-color: white; ">
                    <h2>Total cash = ${total}</h2>
                </div>
                <div class="row d-flex justify-content-around">
                    <div class="col-lg-5 border mt-4 mb-4" style="padding:40px 0px;text-align: center;border-radius: 20px;color:#343541;
                    background-color: white; ">
                        <h2>Cash INs</h2>
                        <input onchange="crud();" id="cashIn" type="number" placeholder="cash in" class="form-control " style="margin-bottom: 20px;" required="">
                    </div>
                    <div class="col-lg-5 border mt-4 mb-4" style="padding:40px 0px; text-align: center;border-radius: 20px; color:#343541;
                    background-color: white;">
                        <h2>Cash OUTs</h2>
                        <input onchange="crud2();" id="cashOut" type="number" placeholder="cash out" class="form-control " style="margin-bottom: 20px;" required="">
                    </div>
                </div>

                <ol class="mt-4" id="history"></ol>

            </div>
        </div>
    </div>
</div>
`;

   

    
}
var totalCash=JSON.parse(localStorage.getItem('total')) || [];
totalCash=Number(totalCash);
console.log(typeof(totalCash));
function crud(){
    var add=document.getElementById('cashIn').value;
    var newadd=Number(add); 
    totalCash=(totalCash+newadd);
    localStorage.setItem('total', JSON.stringify(totalCash));
    const total = JSON.parse(localStorage.getItem('total')) || [];
    // console.log(total);
    var tt=document.getElementById('totalCashed');
    tt.innerHTML=`<h2>Total cash = ${total}</h2>`;
    let history=document.getElementById('history');
    history.innerHTML+= `<li>You add ${newadd} rupees in  Total Cash</li>`;   
    document.getElementById('cashIn').value="";
}
crud();

function crud2(){
    var minus=document.getElementById('cashOut').value;
    var newminus=Number(minus);    
    totalCash=(totalCash-newminus);
    localStorage.setItem('total', JSON.stringify(totalCash));
    var total = JSON.parse(localStorage.getItem('total')) || [];
    // console.log(total);
    var tt=document.getElementById('totalCashed');
    tt.innerHTML=`<h2>Total cash = ${total}</h2>`;
    let history=document.getElementById('history');
    history.innerHTML+= `<li>You withdraw ${newminus} rupees from Total Cash</li>`;
    document.getElementById('cashOut').value="";
}
crud2();

function submitted(event){
    event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const number = document.getElementById('number').value;
        const name = document.getElementById('name').value;
        const photo = document.getElementById('photo').value;
        const lname = document.getElementById('lname').value;
       
        storeUserData(email, password, number, name, photo);
        
        document.getElementById('email').value="";
         document.getElementById('password').value="";
         document.getElementById('number').value="";
         document.getElementById('name').value="";
         document.getElementById('photo').value="";
         document.getElementById('lname').value="";
        
         if(email!=""&&password!=""&&number!=""&&name!=""&&lname!=""&&photo!=""){
            alert("Registered successfully");
         }
         else{
            alert("Not registered something is missing ");
         }
};




function logined(event){
    
    event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        
        const password = document.getElementById('loginPassword').value;
    
        const user = checkLogin(email, password);
        if (user) {            
            showUserPortal(user);           
        } else {
            alert('Invalid email or password. Please try again.');
}
}