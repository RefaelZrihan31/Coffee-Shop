//פונקציה לשליפת כל המשתמשים שנרשמו. במידה ואין מחזירה מערך ריק
function LoadUsers() {

    //והמרה ממחרוזת לאובייקט loacalStrogae -שליפת המידע מתוך ה
    var usersArr = JSON.parse(localStorage.getItem(`users`))

    //בדיקה אם המערך אינו ריק יטען את המערך הקיים
    if (usersArr == null) {
        localStorage.setItem(`users`, JSON.stringify(allUsers));
        return allUsers
    }
    //במידה וקיימים משתמשים שנרשמו נחזיר את הערכים למערך שנוצר
    return usersArr
}

//פונקציה לשליפת כל המוצרים הקיימים בחנות(כל המוצרים במערך המוכן)
function LoadProducts() {

    //והמרה ממחרוזת לאובייקט loacalStrogae -שליפת המידע מתוך ה
    var productsArray = JSON.parse(localStorage.getItem(`allProducts`))

    //נתחזיר מערך ריק- אם לא נרשמו משתמשים null הוא productsArray אם המשתנה
    if (productsArray == null) {
        localStorage.setItem(`allProducts`, JSON.stringify(products));
        return products
    }
    //במידה וקיימים משתמשים שנרשמו נחזיר את הערכים למערך שנוצר
    return productsArray
}


//הרשמה של משתמש חדש
function RegisterUser(event) {

    //ביטול פעולת ברירת המחדל של שליחת טופס - ביטול רענון הדף
    event.preventDefault()

    //שליפת כל הנתונים מטופס ההרשמה
    let user_name = document.querySelector(`#user_name`).value //משתנה מקומי שישמור את הערך של השם משתמש שנקלט 
    let user_pass = document.querySelector(`#user_pass`).value //משתנה מקומי שישמור את הערך של הסיסמה שנקלט 
    let user_pass_confirm = document.querySelector(`#user_pass_confirm`).value //משתנה מקומי שישמור את הערך של האימות סיסמאה שנקלט 
    let user_first_name = document.querySelector(`#user_first_name`).value //משתנה מקומי שישמור את הערך של השם פרטי שנקלט 
    let user_last_name = document.querySelector(`#user_last_name`).value //משתנה מקומי שישמור את הערך של השם משפחה שנקלט 
    let user_email = document.querySelector(`#user_email`).value //משתנה מקומי שישמור את הערך של המייל שנקלט 
    let user_birth_date = document.querySelector(`#user_birth_date`).value //משתנה מקומי שישמור את הערך של התאריך לידה שנקלט 
    let user_city = document.querySelector(`#user_city`).value //משתנה מקומי שישמור את הערך של המס' טלפון שנקלט 
    let user_street = document.querySelector(`#user_street`).value //משתנה מקומי שישמור את הערך של הסוג רכב מועדף שנקלט 
    let user_street_number = document.querySelector(`#user_street_number`).value //משתנה מקומי שישמור את הערך של הסוג רכב מועדף שנקלט 
    let user_profile_image = document.querySelector(`#user_profile_image`).src; //משתנה מקומי שישמור את הייצוג המחרוזתי של תמונת המשתמש שהוכנסה

    //בדיקת סיסמאות - אם הסיסמאות לא תואמות תוצג הודעת שגיאה והמשך התוכנית ייעצר
    if (user_pass !== user_pass_confirm) {
        alert(`הסיסמאות לא תואמות`)
        return;
    }

    //בדיקה אם כתובת המייל קיימת כבר במערכת
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == user_email) {
            alert(`כתובת המייל שהוזנה קיימת במערכת. אנא בחר כתובת אחרת`)
            return;
        }
    }

    //בדיקת רחוב ועיר שהקולד רק עם אותיות בעברית והצגת הודעת שגיאה בהתאם
    if (!onlyHebrewPattern.test(user_street)) {
        alert(`אנא הכנס רחוב בעברית בלבד!`)
        return false;
    } else if (!onlyHebrewPattern.test(user_city)) {
        alert(`אנא הכנס עיר בעברית בלבד!`)
        return false;
    }

    let userDate = new Date(user_birth_date); //Date משתנה שישמור את התאריך שהמשתמש הכניס והמרתו לאובייקט מסוג   
    //בדיקה אם התאריך שהמשתמש הכניס הוא בטווח תואם לגילו בין 0-120
    if (userDate > nowDate || userDate < nowDate.getFullYear() - 120) {
        alert("התאריך שהוכנס אינו תקין");
        return;
    }

    //אם כל הפרטים נכונים יצירת אובייקט חדש של משתמש
    let user = new User(user_name, user_pass, user_first_name, user_last_name, user_email, user_birth_date, user_city, user_street, user_street_number)

    //המערכת תוסיף את המשתמש החדש שנוצר למערך הגלובלי
    users.push(user)

    //localstorage שמירת מערך המשתמשים
    localStorage.setItem(`users`, JSON.stringify(users))

    // //אחרי שהמשתמש נרשם בהצלחה - נרצה לשמור את התמונה במקום ייעודי
    localStorage.setItem(user_name, user_profile_image)

    //הצגת הודעת הצלחה
    alert(`נרשמת בהצלחה`)

    //מעבר לדף התחברות
    location.href = `login.html`
}


//פונקציה שמטרתה לעדכן את פרטי המשתמש
function UpdateUser(event) {

    //ביטול פעולת ברירת המחדל של שליחת טופס - ביטול רענון הדף
    event.preventDefault()

    //שליפת כל הנתונים מטופס ההרשמה
    let user_name = document.querySelector(`#user_name`).value //משתנה מקומי שישמור את הערך של השם משתמש שנקלט 
    let user_pass = document.querySelector(`#user_pass`).value //משתנה מקומי שישמור את הערך של הסיסמה שנקלט 
    let user_pass_confirm = document.querySelector(`#user_pass_confirm`).value //משתנה מקומי שישמור את הערך של האימות סיסמאה שנקלט 
    let user_first_name = document.querySelector(`#user_first_name`).value //משתנה מקומי שישמור את הערך של השם פרטי שנקלט 
    let user_last_name = document.querySelector(`#user_last_name`).value //משתנה מקומי שישמור את הערך של השם משפחה שנקלט 
    let user_email = document.querySelector(`#user_email`).value //משתנה מקומי שישמור את הערך של המייל שנקלט 
    let user_birth_date = document.querySelector(`#user_birth_date`).value //משתנה מקומי שישמור את הערך של התאריך לידה שנקלט 
    let user_city = document.querySelector(`#user_city`).value //משתנה מקומי שישמור את הערך של המס' טלפון שנקלט 
    let user_street = document.querySelector(`#user_street`).value //משתנה מקומי שישמור את הערך של הסוג רכב מועדף שנקלט 
    let user_street_number = document.querySelector(`#user_street_number`).value //משתנה מקומי שישמור את הערך של הסוג רכב מועדף שנקלט 
    let user_profile_image = document.querySelector(`#user_profile_image`).src; //משתנה מקומי שישמור את הייצוג המחרוזתי של תמונת המשתמש שהוכנסה

    //בדיקת סיסמאות - אם הסיסמאות לא תואמות תוצג הודעת שגיאה והמשך התוכנית ייעצר
    if (user_pass !== user_pass_confirm) {
        alert(`הסיסמאות לא תואמות`)
        return;
    }


    let userDate = new Date(user_birth_date); //Date משתנה שישמור את התאריך שהמשתמש הכניס והמרתו לאובייקט מסוג   
    //בדיקה אם התאריך שהמשתמש הכניס הוא בטווח תואם לגילו בין 0-120
    if (userDate > nowDate || userDate < nowDate.getFullYear() - 120) {
        alert("התאריך שהוכנס אינו תקין");
        return;
    }

    //בדיקת רחוב ועיר שהקולד רק עם אותיות בעברית והצגת הודעת שגיאה בהתאם
    if (!onlyHebrewPattern.test(user_street)) {
        alert(`אנא הכנס רחוב בעברית בלבד!`)
        return false;
    } else if (!onlyHebrewPattern.test(user_city)) {
        alert(`אנא הכנס עיר בעברית בלבד!`)
        return false;
    }

    //אם כל הפרטים נכונים יעודכנו פרטי המשתמש
    let user = new User(user_name, user_pass, user_first_name, user_last_name, user_email, user_birth_date, user_city, user_street, user_street_number)

    //מעבר על כל המערך משתמשים והשמה במיקום המתאים את פרטי המשתמש שעודכן עפ"י השם משתמש
    for (let i = 0; i < users.length; i++) {
        if (currentUser.user_name == users[i].user_name) {
            users[i] = user;
        }
    }

    //localstorage שמירת מערך המשתמשים
    localStorage.setItem(`users`, JSON.stringify(users))
    sessionStorage.setItem(`currentUser`, JSON.stringify(user))

    //אחרי שהמשתמש נרשם בהצלחה - נרצה לשמור את התמונה במקום ייעודי
    localStorage.setItem(user_name, user_profile_image)

    //הצגת הודעת הצלחה
    alert(`הפרטים עודכנו בהצלחה!`)

    //מעבר לדף לאחרון שהיה בשימוש
    history.go(-1);

}

//פעולה שמטרתה להחזיר את תאריך לידה של המשתמש בפורמט של יום-שם חודש-שנה
function GetUserDate(user_birth_date) {

    let ddd = new Date(user_birth_date)
    let months = ["ינואר", "פברואור", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]; //יצירת מערך המכיל את שמות החודשים
    return `${[ddd.getDate()]}  ${months[ddd.getMonth()]} ${ddd.getFullYear()}`
}


//פעולה שמחזירה שירשור של השם הפרטי ושם המשפחה של המשתמש
function GetFullName(user_first_name, user_last_name) {
    return `${user_first_name} ${user_last_name}`;
}

//פונקציה להצגת תמונה כאשר משתמש בוחר קובץ
function ShowImage(event) {
    //input ה 
    let element = event.target

    //הקובץ
    let file = element.files[0]

    //אובייקט המאפשר לדפדפן לקרוא את המידע של קובץ מסוים
    let reader = new FileReader()

    //אתחול הפעולה של הקריאה
    //מה לעשות אחרי שהדפדפן הצליח לקרוא את המידע של הקובץ
    reader.onload = () => {
        document.querySelector(`#user_profile_image`).src = reader.result
        localStorage.setItem(`users`, reader.result)
    }

    //הפעלת פעולת הקריאה
    reader.readAsDataURL(file)
}

//התחברות של משתמש קיים
function LoginUser(event) {
    event.preventDefault()

    //שליפת המידע מתוך השדות
    let user_name = document.querySelector(`#user_name`).value
    let user_pass = document.querySelector(`#user_pass`).value

    //מעבר על כל המשתמשים 
    for (let i = 0; i < users.length; i++) {
        if (users[i].user_name == user_name && users[i].password == user_pass) {

            //session storage שמירת פרטי המשתמש ב 
            sessionStorage.setItem(`currentUser`, JSON.stringify(users[i]))
            alert(`התחברת בהצלחה והנך מועבר לדף הפרופיל`)
            location.href = `profile.html`
            return
        }
    }
    //אם הגעתי לכאן - סימן שאין משתמש קיים העונה לפרטים שהוזנו
    alert(`פרטי המשתמש שהוזנו אינם קיימים במאגר`)
    window.location.reload();
}

//פונקציה שמטרתה להראות את פרטי המשתמש
function ShowUserProfile() {
    //תפיסת שדות שמולאו- ובדיקה אם אותן שדות שייכות לפרטי מנהל האתר
    let userInput = document.querySelector(`#user_name`).value = currentUser.user_name
    let passInput = document.querySelector(`#user_pass`).value = currentUser.password
    if (userInput == "admin" && passInput == "admin1234admin") {
        location.href = `adminPage.html`
    }
    //השמה של מידע בתוך השדות בטופס של משתמש רגיל
    else {

        if (location.href.indexOf(`updateProfile`) != -1) {
            document.querySelector(`#user_first_name`).value = currentUser.first_name
            document.querySelector(`#user_last_name`).value = currentUser.last_name
            document.querySelector(`#user_birth_date`).value = currentUser.birth_date
        } else {
            document.querySelector(`#user_full_name`).value = GetFullName(currentUser.first_name, currentUser.last_name)
            document.querySelector(`#user_birth_date`).value = GetUserDate(currentUser.birth_date)
        }
        document.querySelector(`#user_email`).value = currentUser.email
        document.querySelector(`#user_city`).value = currentUser.city
        document.querySelector(`#user_street`).value = currentUser.street
        document.querySelector(`#user_street_number`).value = currentUser.street_number
        //שליפת המידע של התמונה מתוך הלוקאל סטורג לפי שם המשתמש
        document.querySelector(`#user_profile_image`).src = localStorage.getItem(currentUser.user_name)
    }
}

//פונקציה שמטרתה להציג את השדות של המוצר בטופס עדכון מוצר
function ShowProduct() {
    //השמה של מידע בתוך השדות בטופס
    let currentProducto = sessionStorage.getItem(`product`)
    currentProducto = JSON.parse(currentProducto)
    if (location.href.indexOf(`updateProduct`) != -1) {
        document.querySelector(`#product_sn`).value = currentProducto.serialN //משתנה מקומי שישמור את הערך של המס' הסידורי של המוצר שנקלט 
        document.querySelector(`#product_name`).value = currentProducto.nameP //משתנה מקומי שישמור את הערך של שם המוצר שנקלט 
        document.querySelector(`#product_orignal_price`).value = currentProducto.priceOriginalP //משתנה מקומי שישמור את הערך של מחירו המקורי של המוצר שנקלט לאחר המרתו למס' עשרוני
        document.querySelector(`#product_finale_price`).value = currentProducto.finalePriceP //משתנה מקומי שישמור את הערך של גובה ההנחה של המוצר שנקלט לאחר המרתו למס' עשרוני
        document.querySelector(`#product_description`).value = currentProducto.descriptionP //משתנה מקומי שישמור את הערך של תיאור המוצר שנקלט 
        document.querySelector(`#product_category`).value = currentProducto.category //משתנה מקומי שישמור את הערך של הקטגוריה של המוצר שנבחר 
        document.querySelector(`#product_file`).value.split(/(\\|\/)/g).pop() //משתנה מקומי שישמור את הייצוג המחרוזתי של תמונת המוצר שהוכנסה
    }
}


// ----------פונקציות הוספה לסל הקניות------------//

//פונקציה שמטרתה לשמור על כמות המוצרים שנוספו לסל גם לאחר ריענון הדף
function OnLoadCartNumbers() {
    let productNumbers = sessionStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.total-count').textContent = productNumbers;
    }
}

//פונקציה שמטרתה להוסיף מוצרים לסל הקניות והדפסת כמות המוצרים שנוספו לעגלה
function CartNumbers(product) {

    let productNumbers = sessionStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers)
    if (productNumbers) {
        sessionStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.total-count').textContent = productNumbers + 1;
    } else {
        sessionStorage.setItem('cartNumbers', 1)
        document.querySelector('.total-count').textContent = 1;
    }
    SetItems(product);
}

//פונקציה שמטרתה לשמור על המוצרים שהתווספו לסל הקניות
function SetItems(product) {
    let cartItems = sessionStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.serialN] == undefined) {
            cartItems = {
                ...cartItems,
                [product.serialN]: product
            }
        }
        cartItems[product.serialN].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.serialN]: product
        }
    }
    //לכמות המוצרים שיש בסל הקניות sessionStorage -עדכון ה
    sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


//חישוב המחיר הסופי לכל המוצרים
function TotalCost(product) {
    let cartCost = sessionStorage.getItem('totalCost');
    if (cartCost != null) {
        cartCost = parseFloat(cartCost);
        sessionStorage.setItem("totalCost", cartCost + product.finalePriceP)
    } else {
        sessionStorage.setItem("totalCost", product.finalePriceP)
    }

}

//פונקציה המדפיסה את כל הפרטים שנוספו לסל הקניות בדף עגלת הקניות
function DisplayCart() {
    let cartItems = sessionStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = sessionStorage.getItem('totalCost');
    let totalCartBtn = document.querySelector(".totalPriceCart");
    if (cartItems && productContainer && totalCartBtn) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tr>
           
            <td>
                <span>${item.nameP}</span>
            </td>

            <td>
            <img src="/photoCart/${item.img}">
            </td>
        
            <td>   
            <span class="user-subhead">${item.serialN}</span>
            </td>
           
            <td>
            <span>${item.inCart}</span>
            </td>
       
            <td>
           <span>${(Math.round(item.finalePriceP * 100) / 100).toFixed(2)}</span>
            </td>
            
            <td>
           <span>${(Math.round((item.inCart * item.finalePriceP) * 100) / 100).toFixed(2)} ₪</span>
            </td>
            
            <td style="width: 1%;">
                <a class="remove-item table-link danger">
                    <span class="fa-stack">
                        <i  class="fa fa-square fa-stack-2x"></i>
                        <i  data-serialn="${item.serialN}" class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                    </span>
                </a>
            </td>

            </tr>
            `;
            totalCartBtn.innerHTML = `
        <div class="basketTotalContainer">
        <h4 class="basketTotal">
        לתשלום:        
        <span> ${(Math.round(cartCost * 100) / 100).toFixed(2)}</span> ₪
        </h4>
        <a href="https://i1.wp.com/isc2chapter-toronto.ca/wp-content/uploads/2021/04/Thanks.png?ssl=1">
        <button style="text-align: center; type="button" class="btn btn-danger btn-sm" >לתשלום</button>
        </a>
        </div>
        `
        });
        //מחיר סופי לתשלום וכמות המוצרים שיש בעגלה sessionStorage -תפיסת האלמנט להסרת מוצר מסל הקניות ועדכון ה
        let button = document.getElementsByClassName('remove-item')
        for (let i = 0; i < button.length; i++) {
            button[i].addEventListener('click', function (event) {
                let clicked = event.target
                let serialn = clicked.dataset.serialn;
                let totalP = parseFloat(sessionStorage.getItem(`totalCost`));
                totalP -= cartItems[serialn].inCart * cartItems[serialn].finalePriceP;
                let cartP = parseInt(sessionStorage.getItem(`cartNumbers`))
                cartP -= cartItems[serialn].inCart;
                let numberCart = document.querySelector(`.total-count`);
                delete cartItems[serialn]
                sessionStorage.setItem(`productsInCart`, JSON.stringify(cartItems))
                let priceHolder = document.querySelector(`.basketTotal span`);
                priceHolder.innerHTML = totalP;
                sessionStorage.setItem(`totalCost`, totalP)
                sessionStorage.setItem(`cartNumbers`, cartP)
                numberCart.innerHTML = cartP;
                window.location.reload();

            })
        }
    }

}

//דף להצגת קטגוריות החנות לפי הבחירה בתפריט הניווט בראש הדף
function DisplayCategoryProduct() {
    let cater = sessionStorage.getItem(`cat`)
    var containP = document.querySelector("#products_holder");
    if (containP && productsA) {
        containP.innerHTML = '';
        Object.values(productsA.filter(item => item.category == cater)).map(item => {
            if (item.priceOriginalP == item.finalePriceP) {
                containP.innerHTML += `
         <div class="col-12 col-md-6 col-lg-4 g-5">
            <div class="card" data-categoryP="${item.category}">
                <div class="pw_img">
                    <img class="card-img-top" data-serialn="${item.serialN}" src="/photoCart/${item.img}" alt="Card image cap">
                </div>
                <div class="card-body">
                    <a class="show-product card-title-cat" style="text-decoration: none; outline: none;  color: #000;" data-namepro="${item.nameP}"
                        title="View Product">${item.nameP} </a>
                    <p class="card-text-cat">${item.descriptionP}</p>
                    <div class="row">
                        <div class="col">
                            <p class="price-cat">${(Math.round(item.finalePriceP * 100) / 100).toFixed(2)} ₪</p>
                        </div>
                        <div class="col">
                            <button type="button"  data-serialn="${item.serialN}" class="add-cart btn btn-warning rounded-pill btn-sm text-uppercase mr-2 px-4">הוסף
                                לסל</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            `
                //במידה ויש מחיר שונה למוצר מהמחיר המקורי שלו- יוצג המחיר בהנחה והמחיר המקורי של המוצר עם קו עליו
            } else {
                containP.innerHTML += `
                <div class="col-12 col-md-6 col-lg-4 g-5">
                   <div class="card" data-categoryP="${item.category}">
                       <div class="pw_img">
                           <img class="card-img-top" data-serialn="${item.serialN}" src="/photoCart/${item.img}" alt="Card image cap">
                       </div>
                       <div class="card-body">
                           <a class="show-product card-title-cat" style="text-decoration: none; outline: none;  color: #000;" data-namepro="${item.nameP}"
                               title="View Product">${item.nameP} </a>
                           <p class="card-text-cat">${item.descriptionP}</p>
                           <div class="row">
                               <div class="col">
                               <small class="dis-price">${(Math.round(item.priceOriginalP * 100) / 100).toFixed(2)} ₪</small>
                                   <p class="price-cat">${(Math.round(item.finalePriceP * 100) / 100).toFixed(2)} ₪</p>
                               </div>
                               <div class="col">
                                   <button type="button" data-serialn="${item.serialN}" class="add-cart btn btn-warning rounded-pill btn-sm text-uppercase mr-2 px-4">הוסף
                                       לסל</button>
                               </div>
                           </div>
                       </div>
                   </div>
                </div>
                   `
            }
        });
        AddToCart()
    }
    //תפיסת האלמנט של סינון לפי מחיר מהנמוך לגובה- סידור המוצרים בקטגוריה לפי המחיר מהנמוך לגבוה
    let sortPrice = document.querySelector(`#sortByPrice`).addEventListener(`click`, (e) => {
        sortPrice = e.target.id;
        if (containP && productsA) {
            containP.innerHTML = '';
            Object.values(productsA.filter(item => item.category == cater).sort(function (a, b) {
                return a.finalePriceP - b.finalePriceP;
            })).map(item => {
                if (item.priceOriginalP == item.finalePriceP) {
                    containP.innerHTML += `
             <div class="col-12 col-md-6 col-lg-4 g-5">
                <div class="card" data-categoryP="${item.category}">
                    <div class="pw_img">
                        <img class="card-img-top" data-serialn="${item.serialN}" src="/photoCart/${item.img}" alt="Card image cap">
                    </div>
                    <div class="card-body">
                        <a class="show-product card-title-cat" style="text-decoration: none; outline: none;  color: #000;" data-namepro="${item.nameP}"
                            title="View Product">${item.nameP} </a>
                        <p class="card-text-cat">${item.descriptionP}</p>
                        <div class="row">
                            <div class="col">
                                <p class="price-cat">${(Math.round(item.finalePriceP * 100) / 100).toFixed(2)} ₪</p>
                            </div>
                        <div class="col">
                                <button type="button" data-serialn="${item.serialN}" class="add-cart btn btn-warning rounded-pill btn-sm text-uppercase mr-2 px-4">הוסף
                                    לסל</button>
                            </div>
                         </div>
                       </div>
                     </div>
                  </div> 
             </div>
                `
                }
                //במידה ויש מחיר שונה למוצר מהמחיר המקורי שלו- יוצג המחיר בהנחה והמחיר המקורי של המוצר עם קו עליו
                else {
                    containP.innerHTML += `
                    <div class="col-12 col-md-6 col-lg-4 g-5">
                    
                    <div class="card" data-categoryP="${item.category}">
                            <div class="pw_img">
                               <img class="card-img-top" data-serialn="${item.serialN}" src="/photoCart/${item.img}" alt="Card image cap">
                             </div>
                           <div class="card-body">
                               <a class="show-product card-title-cat" style="text-decoration: none; outline: none;  color: #000;" data-namepro="${item.nameP}"
                                   title="View Product">${item.nameP} </a>
                               <p class="card-text-cat">${item.descriptionP}</p>
                           
                               <div class="row">
                                 
                                  <div class="col">
                                     <small class="dis-price">${(Math.round(item.priceOriginalP * 100) / 100).toFixed(2)} ₪</small>
                                       <p class="price-cat">${(Math.round(item.finalePriceP * 100) / 100).toFixed(2)} ₪</p>
                                   </div>
                              
                                   <div class="col">
                                           <button type="button" data-serialn="${item.serialN}" class="add-cart btn btn-warning rounded-pill btn-sm text-uppercase mr-2 px-4">הוסף
                                           לסל</button>
                                   </div>
                              
                                </div>
                           </div>
                       </div>
                    </div>
                </div>
                       `
                }
            });
            AddToCart()
        }
    });
}


//פונקציה שמטרתה להציג את כותרת הדף עפ"י הקטגוריה שנבחרה בתפריט הניווט בראש הדף
function DisplayCategoryProductTitle() {
    let caterTitle = sessionStorage.getItem(`catTitle`);
    let pageCaterTitle = document.querySelector(`#productPageTitle`);
    if (pageCaterTitle && caterTitle) {
        pageCaterTitle.innerHTML = '';
        Object.values(caterTitle).map(() => {
            pageCaterTitle.innerHTML = `
            <div class="card title_pru">
            <div class="card-body">
                <h5 class="card-text text_title">${caterTitle}</h5>
            </div>
        </div>
        <br>
        <div class="tags_location">
            <a class="tags_location_text" >דף הבית > </a> <a class="tags_location_text" > ${caterTitle}</a>

        </div>
        </div>
            `
        });
    }
}


//פונקציה שמטרתה להציג את כותרת הדף עפ"י הקטגוריה שנבחרה ואת סדר ההגעה לדף עם שם המוצר
function DisplayProductTitle() {
    let productTitle = sessionStorage.getItem(`currentProduct`);
    let caterTitle = sessionStorage.getItem(`catTitle`);
    let pageCaterTitle = document.querySelector(`#productTitle`);
    if (productTitle && caterTitle && pageCaterTitle) {
        pageCaterTitle.innerHTML = '';
        Object.values(productsA.filter(item => item.serialN == productTitle).map(item => {
            pageCaterTitle.innerHTML = `
            <div class="card title_pru">
            <div class="card-body">

                <h5 class="card-text text_title">${caterTitle}</h5>
            </div>
        </div>
        <br>
        <div class="tags_location">
            <a class="tags_location_text">דף הבית > </a> <a class="tags_location_text"
              >${caterTitle} > </a>
            <a class="tags_location_text">${item.nameP}</a>
        </div> 
            `
        }));
    }
}


//הצגת דף המוצר שנבחר מתוך דף הקטגוריות
function DisplayProduct() {
    let productSerial = sessionStorage.getItem(`currentProduct`)
    let containPr = document.querySelector("#product-current-holder");
    if (containPr && productsA) {
        containPr.innerHTML = '';
        Object.values(productsA.filter(item => item.serialN == productSerial).map(item => {
            if (item.priceOriginalP == item.finalePriceP) {
                containPr.innerHTML += `
            <div class="col-sm-6 wallp">
                    <img src="/photoCart/${item.img}"
                    width="335px" height="310px"/>
            </div>
            <div class="col-md-6">
                <div class="cont-product p-4">
                    <div class="mt-4 mb-3">
                        <h4 class="text-uppercase">${item.nameP}</h4>
                        <span class="text-muted brand">מק״ט: ${item.serialN}</span>
                        <div class="puan d-flex">
                            <img src="https://i.hizliresim.com/JD1Ogn.png" alt="">
                            <img src="https://i.hizliresim.com/GDVyr3.png" alt="">
                            <img src="https://i.hizliresim.com/GDVyr3.png" alt="">
                            <img src="https://i.hizliresim.com/GDVyr3.png" alt="">
                            <img src="https://i.hizliresim.com/GDVyr3.png" alt="">
                        </div>
                        <div class="price d-flex flex-row align-items-center">
                            <strong class="mx-2">מחיר :</strong>
                            <span class="act-price">${(Math.round(item.finalePriceP * 100) / 100).toFixed(2)}₪</span>
                        </div>
                    </div>

                    <p class="about">${item.descriptionP}</p>
                    <hr>                
                    <div class="cart mt-4 align-items-center">
                       <a href="/shoppingCart.html"><button data-serialn="${item.serialN}" class="add-cart btn btn-success rounded-pill text-uppercase mr-2 px-4">קנה
                            עכשיו</button></a>
                        <button data-serialn="${item.serialN}" class="add-cart shop-item-button btn btn-warning rounded-pill text-uppercase mr-2 px-4">הוסף
                            לסל</button>
                    </div>
                </div>
            </div>
          `
            }
            //במידה ויש מחיר שונה למוצר מהמחיר המקורי שלו- יוצג המחיר בהנחה והמחיר המקורי של המוצר עם קו עליו
            else {
                containPr.innerHTML += `
                <div class="col-sm-6 wallp">
                        <img src="/photoCart/${item.img}"
                        width="335px"  height="310px"/>
                </div>
                <div class="col-md-6">
                    <div class="cont-product p-4">
                        <div class="mt-4 mb-3">
                            <h4 class="text-uppercase">${item.nameP}</h4>
                            <span class="text-muted brand">מק״ט: ${item.serialN}</span>
                            <div class="puan d-flex">
                                <img src="https://i.hizliresim.com/JD1Ogn.png" alt="">
                                <img src="https://i.hizliresim.com/GDVyr3.png" alt="">
                                <img src="https://i.hizliresim.com/GDVyr3.png" alt="">
                                <img src="https://i.hizliresim.com/GDVyr3.png" alt="">
                                <img src="https://i.hizliresim.com/GDVyr3.png" alt="">
                            </div>
                            <div class="price d-flex flex-row align-items-center">
                                <strong class="mx-2">מחיר :</strong>
                                 <span class="act-price">${(Math.round(item.finalePriceP * 100) / 100).toFixed(2)} ₪</span>
                                <div class="ml-2 mx-2">
                                  <small class="dis-price">${(Math.round(item.priceOriginalP * 100) / 100).toFixed(2)} ₪</small>
                                </div> 
                            </div>
                        </div>
    
                        <p class="about">${item.descriptionP}</p>
                        <hr>                
                        <div class="cart mt-4 align-items-center">
                        <a href="/shoppingCart.html"><button data-serialn="${item.serialN}" class="add-cart btn btn-success rounded-pill text-uppercase mr-2 px-4">קנה
                         עכשיו</button></a>
                            <button data-serialn="${item.serialN}" class="add-cart shop-item-button btn btn-warning rounded-pill text-uppercase mr-2 px-4">הוסף
                                לסל</button>
                        </div>
                    </div>
                </div>
              `
            }
        }));

        AddToCart()
    }
}


//addproduct.html הוספת מוצר עי מנהל האתר מעמוד 
function AddProduct(event) {
    //ביטול פעולת ברירת המחדל של שליחת טופס - ביטול רענון הדף
    event.preventDefault()

    //שליפת כל הנתונים מטופס הוספת מוצר
    let p_serialN = document.querySelector(`#product_sn`).value //משתנה מקומי שישמור את הערך של המס' הסידורי של המוצר שנקלט 
    let p_name = document.querySelector(`#product_name`).value //משתנה מקומי שישמור את הערך של שם המוצר שנקלט 
    let p_priceOriginal = parseFloat(document.querySelector(`#product_orignal_price`).value) //משתנה מקומי שישמור את הערך של מחירו המקורי של המוצר שנקלט לאחר המרתו למס' עשרוני
    let p_finalePrice = parseFloat(document.querySelector(`#product_finale_price`).value) //משתנה מקומי שישמור את הערך של גובה ההנחה של המוצר שנקלט לאחר המרתו למס' עשרוני
    let p_description = document.querySelector(`#product_description`).value //משתנה מקומי שישמור את הערך של תיאור המוצר שנקלט 
    let p_category = document.querySelector(`#product_category`).value //משתנה מקומי שישמור את הערך של הקטגוריה של המוצר שנבחר 
    let p_image = document.querySelector(`#product_file`).value.split(/(\\|\/)/g).pop(); //משתנה מקומי שישמור את הייצוג המחרוזתי של תמונת המוצר שהוכנסה

    //בדיקה אם המספר הסידורי של המוצר שהוקלד קיים כבר במערכת
    for (let i = 0; i < productsA.length; i++) {
        if (productsA[i].serialN == p_serialN) {
            alert(`המספר הסידורי כבר קיים במערכת.`)
            return;
        }
    }

    //Product יצירת אובייקט חדש מסוג
    let product = new Product(p_serialN, p_name, p_priceOriginal, p_finalePrice, p_description, p_category, p_image)

    //המערכת תוסיף את המוצר החדש למערך הגלובלי
    productsA.push(product)

    //localstorage שמירת מערך המוצרים
    localStorage.setItem(`allProducts`, JSON.stringify(productsA))

    //הצגת הודעת הצלחה
    alert(`המוצר נוסף בהצלחה!`)

    //מעבר לדף לאחרון שהיה בשימוש
    history.go(-1);
}





//פונקציה שמטרתה להוסיף מוצרים מתוך האתר לסל הקניות
function AddToCart() {
    var carts = document.querySelectorAll('.add-cart');
    // let quantPro = document.querySelector(`#quanto`).addEventListener(`blur`);
    //לולאה שסופרת את כמות ההוספה לסל
    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener(`click`, (e) => {
            let serialn = e.target.dataset.serialn;
            // sessionStorage.setItem(`productsInCart`,e.value)
            let tempProduct = productsA.filter(item => item.serialN == serialn)
            CartNumbers(tempProduct[0]);
            TotalCost(tempProduct[0]);

        })
    }
}


//------------------------פונקציות שקשורות לניהול המוצרים---------------------------//

//פונקציה שמטרתה לעדכן את פרטי המוצר מדף ניהול המוצרים
function UpdateProduct(event) {
    //ביטול פעולת ברירת המחדל של שליחת טופס - ביטול רענון הדף
    event.preventDefault()

    //שליפת כל הנתונים מטופס הוספת מוצר
    let p_serialN = document.querySelector(`#product_sn`).value //משתנה מקומי שישמור את הערך של המס' הסידורי של המוצר שנקלט 
    let p_name = document.querySelector(`#product_name`).value //משתנה מקומי שישמור את הערך של שם המוצר שנקלט 
    let p_priceOriginal = parseFloat(document.querySelector(`#product_orignal_price`).value) //משתנה מקומי שישמור את הערך של מחירו המקורי של המוצר שנקלט לאחר המרתו למס' עשרוני
    let p_finalePrice = parseFloat(document.querySelector(`#product_finale_price`).value) //משתנה מקומי שישמור את הערך של גובה ההנחה של המוצר שנקלט לאחר המרתו למס' עשרוני
    let p_description = document.querySelector(`#product_description`).value //משתנה מקומי שישמור את הערך של תיאור המוצר שנקלט 
    let p_category = document.querySelector(`#product_category`).value //משתנה מקומי שישמור את הערך של הקטגוריה של המוצר שנבחר 
    let p_image = document.querySelector(`#product_file`).value.split(/(\\|\/)/g).pop(); //משתנה מקומי שישמור את הייצוג המחרוזתי של תמונת המשתמש שהוכנסה


    //Product יצירת אובייקט חדש מסוג
    let product = new Product(p_serialN, p_name, p_priceOriginal, p_finalePrice, p_description, p_category, p_image)

    //בדיקת המפתח החד ערכי של המוצר ועדכונו במערך
    for (let i = 0; i < productsA.length; i++) {
        if (productsA[i].serialN == p_serialN) {
            productsA[i] = product
        }
    }
    //localstorage -שמירת מערך המוצרים המעודכן ב
    localStorage.setItem(`allProducts`, JSON.stringify(productsA))

    //הצגת הודעת הצלחה
    alert(`המוצר עודכן בהצלחה!`)

    //מעבר לדף לאחרון שהיה בשימוש
    history.go(-1);
}

//הצגת דף ניהול מוצרים והדפסת כל מוצרי החנות הקיימים כאשר רק מנהל האתר יכול לצפות בדף זה
function DisplayManagerItems() {
    let allProducts = localStorage.getItem("allProducts");
    allProducts = JSON.parse(allProducts);
    let productContainerM = document.querySelector(".productsManageAll");
    if (allProducts && productContainerM) {
        productContainerM.innerHTML = '';
        Object.values(allProducts).map(item => {
            productContainerM.innerHTML += `
            <tr>
            <td>
                <img src="/photoCart/${item.img}">
                <span class="user-subhead">${item.nameP}</span>
            </td>
            <td>${item.serialN}</td>
            <td class="text-center">
                <span class="label label-default">${item.descriptionP}</span>
            </td>
            <td>
                <span>${item.priceOriginalP}</span>
            </td>
            <td>
            <span>${item.finalePriceP}</span>
        </td>
        <td>
        <span>${item.category}</span>
    </td>
            <td style="width: 20%;">
                <a class="updateproduct table-link text-info">
                    <span class="fa-stack">
                        <i class="fa fa-square fa-stack-2x"></i>
                        <i data-serialn="${item.serialN}" class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                    </span>
                </a>
                <a class="remove-item table-link danger">
                    <span class="fa-stack">
                        <i  class="fa fa-square fa-stack-2x"></i>
                        <i  data-serialn="${item.serialN}" class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                    </span>
                </a>
            </td>
            </tr>
            `;
        });
        //localStorage - מחיקת מוצר מתוך כל המוצרים הקיימים ועדכון מערך המוצרים ב 
        let button = document.getElementsByClassName('remove-item')
        for (let i = 0; i < button.length; i++) {
            button[i].addEventListener('click', function (event) {
                    let clicked = event.target
                    for (let j = 0; j < productsA.length; j++) {
                        if (productsA[j].serialN == clicked.dataset.serialn) {
                            productsA.splice(j, 1);
                            localStorage.setItem(`allProducts`, JSON.stringify(productsA))
                            window.location.reload();
                            break;
                        }

                    }

                }

            )
        }
        //תפיסת האלמנט לעדכון המוצר
        let updateProductBtn = document.getElementsByClassName('updateproduct');
        for (let i = 0; i < updateProductBtn.length; i++) {
            updateProductBtn[i].addEventListener('click', function (event) {
                let upProClicked = event.target;
                for (let j = 0; j < productsA.length; j++) {
                    if (productsA[j].serialN == upProClicked.dataset.serialn) {
                        sessionStorage.setItem(`product`, JSON.stringify(productsA[j]))
                        location.href = "updateProduct.html";

                    }
                }
            })
        }
    }
}


//פונקציה שמטרתה להראות את כל המשתמשים שנרשמו לאתר
function DisplayManagerUsers() {
    let allUsers = localStorage.getItem("users");
    allUsers = JSON.parse(allUsers);
    let usersContainerM = document.querySelector(".UsersManageAll");
    if (allUsers && usersContainerM) {
        usersContainerM.innerHTML = '';
        Object.values(allUsers).map(item => {
            usersContainerM.innerHTML += `
            <tr>
            <td>
                <img id="profile-Img" src="${item.img||localStorage.getItem(item.user_name)}">
                <a class="user-link">${item.user_name}</a>
                <span class="user-subhead">${GetFullName(item.first_name,item.last_name)}</span>
            </td>
            <td>${GetUserDate(item.birth_date)}</td>
            <td class="text-center">
                <span class="label label-default">${item.street} ${item.street_number}, ${item.city}</span>
            </td>
            <td>
                <span>${item.email}</span>
            </td>
            <td style="width: 20%;">
                <a class="updateuser table-link text-info">
                    <span class="fa-stack">
                        <i class="fa fa-square fa-stack-2x"></i>
                        <i data-username="${item.user_name}" class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                    </span>
                </a>
                <a class="remove-itemx table-link danger">
                    <span class="fa-stack">
                        <i  class="fa fa-square fa-stack-2x"></i>
                        <i  data-username="${item.user_name}" class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                    </span>
                </a>
            </td>
            </tr>
            `;
        });
        //localStorage - מחיקת המשתמש מתוך כל המערך משתמשים הקיימים ועדכון מערך המשתמשים ב 
        let button = document.getElementsByClassName('remove-itemx')
        for (let i = 0; i < button.length; i++) {
            button[i].addEventListener('click', function (event) {
                    let clicked = event.target
                    for (let j = 0; j < users.length; j++) {
                        if (users[j].user_name == clicked.dataset.username) {
                            users.splice(j, 1);
                            localStorage.setItem(`users`, JSON.stringify(users))
                            window.location.reload();
                            break;
                        }

                    }

                }

            )
        }

        //localStorage -עדכון פרטי המשתמש מתוך כל המערך משתמשים הקיימים ועדכון מערך המשתמשים ב 
        let updateBtn = document.getElementsByClassName('updateuser');
        for (let i = 0; i < updateBtn.length; i++) {
            updateBtn[i].addEventListener('click', function (event) {
                    let upClicked = event.target;
                    for (let j = 0; j < users.length; j++) {
                        if (users[j].user_name == upClicked.dataset.username) {
                            sessionStorage.setItem(`currentUser`, JSON.stringify(users[j]))
                            location.href = "updateProfile.html";

                        }

                    }

                }

            )

        }

    }
}