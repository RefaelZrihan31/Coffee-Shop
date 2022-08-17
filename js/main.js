//יצירת משתנים גלובליים

//טעינה של כל המשתמשים שיש במערכת
var users = LoadUsers()
//יצירת אובייקט שישמור את התאריך הנוכחי לבדיקת תקינות תאריך הלידה בטופס רישום + עדכון פרטי משתמש
const nowDate = new Date();

//יצירת משתנה קבוע המשמש לבדיקות תקינות הקלט של השדות בעברית בדף הרישום + עדכון פרטי משתמש
const onlyHebrewPattern = new RegExp(/^[\u0590-\u05FF ,.'-]+$/i);

//שליפת פרטי המוצרים לפי מיקומם במערך 
var productsA = LoadProducts();

//null ניסיון לשליפת פרטי המשתמש שהתחבר. במידה ולא התחבר אף משתמש הערך יהיה 
var currentUser = JSON.parse(sessionStorage.getItem(`currentUser`)) || null


//תפיסת אלמנט טופס ההרשמה ושיוך אירוע של שליחה המפעילה פונקציה לרישום המתשמש
if (document.querySelector(`#register_form`))
    document.querySelector(`#register_form`).addEventListener(`submit`, RegisterUser)

//תפיסת אלמנט הוספת מוצר ושיוך אירוע של שליחה המפעילה פונקציה להוספת מוצר לחנות
if (document.querySelector(`#addProduct_form`))
    document.querySelector(`#addProduct_form`).addEventListener(`submit`, AddProduct)

//תפיסת אלמנט עדכון פרטי משתמש ושיוך אירוע של שליחה המפעילה פונקציה לעדכון פרטי המשתמש
if (document.querySelector(`#update_profile`)) {
    document.querySelector(`#update_profile`).addEventListener(`submit`, UpdateUser)

}

//תפיסת אלמנט עדכון פרטי מוצר ושיוך אירוע של שליחה המפעילה פונקציה לעדכון פרטי המוצר
if (document.querySelector(`#updateProduct`)) {
    document.querySelector(`#updateProduct`).addEventListener(`submit`, UpdateProduct)

}


//תפיסת האלמנט של קובץ התמונה ושיוך אירוע של שינוי תמונת פרופיל משתמש
if (document.querySelector(`#user_profile_file`))
    document.querySelector(`#user_profile_file`).addEventListener(`change`, ShowImage)


//תפיסת טופס ההתחברות ושיוך אירוע של שליחה המעבירה לדף פרופיל\דף מנהל אתר
if (document.querySelector(`#login_form`))
    document.querySelector(`#login_form`).addEventListener(`submit`, LoginUser)


//בודק אם אני נמצא בדף הפרופיל
if (location.href.indexOf(`profile`) != -1 || location.href.indexOf(`updateProfile`) != -1) {
    ShowUserProfile()
}

//בדיקה אם אני בדף עדכון מוצרים והפעלת הפונקציה שתראה את פרטי המוצר שנבחר לעדכון בשדות המתאימים
if (location.href.indexOf(`updateProduct`) != -1) {
    ShowProduct()
}

//תפיסת אלמנט עדכון פרטי משתמש ושיוך אירוע של שליחה המפעילה פונקציה לעדכון פרטי המשתמש- בטבלת ניהול משתמשים
if (document.querySelector(`#updateuser`)) {
    document.querySelector(`#updateuser`).addEventListener(`click`, UpdateUser);
}


//בדיקה אם אני נמצא בדף הרישום או בדף עדכון פרטי משתמש והצגה של ערי ישראל לפי אות או רצף של אותיות
if (location.href.indexOf(`register`) != -1 || location.href.indexOf(`updateProfile`) != -1) {
    var cities_list = document.getElementById("cities"); //תפיסת האלמנט ושמירתו במשתנה מקומי 
    //זימון מערך הערים בעזרת לולאה שמטרתה להציג את כל רשימת הערים במערך לפי שם העיר
    cities.forEach(function (item) {
        var option = document.createElement('option');
        option.value = item.name;
        cities_list.appendChild(option);
    })
}

//sessionStorage תפיסת האלמנט של כפתור ההתנקות והוספת אירוע לחיצה המפעילה פונקציה אנונימית שתנקה את הזיכרון 
if (document.querySelector(`#log_out`)) {
    document.querySelector(`#log_out`).addEventListener(`click`, () => {
        sessionStorage.clear()
    })
}


// ----------הוספת פריטים לעגלת הקניות-----------//
//בדיקה שאני לא בדף רישום\עדכון פרטי משתמש או בדף התחברות והפעלת הפונקציה לעדכון הפריטים שיש בסל הקניות
if (location.href.indexOf(`register`) == -1 || location.href.indexOf(`updateProfile`) == -1 || location.href.indexOf(`login`) == -1) {
    //הפעלה של הפעולה ששומרת את כמות המוצרים שנוספו לסל
    OnLoadCartNumbers()
}

//בדיקה שאני נמצא בדף עגלת הקניות והפעלת הפונקציה שמראה את המוצרים שיש בסל
if (location.href.indexOf(`shoppingCart`) != -1) {
    DisplayCart()
}

//בדיקה שאני בדף הוספת מוצר- מנהל אתר. ותפיסת האלמנט לשליחת פרטי המוצר החדש שנוסף
if (location.href.indexOf(`addproduct`) != -1) {
    document.querySelector(`#addProduct_form`).addEventListener(`submit`, AddProduct)
}


//תפיסת אלמנט של הקטגוריה בתפריט הניווט ומעבר לדף הקטגוריה הרצויה באמצעות עדכון הקליק 
//SessionStorage - בעכבר ועדכון ה
let links = document.querySelectorAll(`.dropdown-item`)
links.forEach(link => link.addEventListener(`click`, (e) => {
    sessionStorage.setItem(`cat`, e.target.id)
    sessionStorage.setItem(`catTitle`, e.target.dataset.cater)
    location.href = 'categoryPage.html'
}))


//תפיסת מוצרי פוטר קבועים והעברה לדף מוצר בעת לחיצה
if (location.href.indexOf(`index`) != -1 || location.href.indexOf(`categoryPage`) != -1 || location.href.indexOf(`productPage`) != -1) {

    //(איזור דף הבית) מוצרי פוטר קבועים שמועברים לדף מוצר
    let caterHome = document.querySelectorAll(`.card-footer`);
    caterHome.forEach(cathome => cathome.addEventListener(`click`, (e) => {
        sessionStorage.setItem(`cat`, e.target.id)
        sessionStorage.setItem(`catTitle`, e.target.dataset.cater)
        location.href = 'categoryPage.html'
    }))

    //(דף מוצר / דף קטגוריה) מוצרי פוטר קבועים שמועברים לדף מוצר
    let productIndex = document.querySelectorAll(`.card-footer-pk`)
    productIndex.forEach(item => item.addEventListener(`click`, (e) => {
        sessionStorage.setItem(`currentProduct`, e.target.dataset.serialn)
        sessionStorage.setItem(`catTitle`, e.target.dataset.cater)
        location.href = 'productPage.html'

    }))
}

//sessionStorge -תפיסת האלמנטים של הקטגרויות שיש בתפריט הניווט בראש הדף ושיוך אירוע לחיצה לפי הקטגוריה שנבחרה ועדכון ה
let icons = document.querySelectorAll(`.navbar-brand`);
icons.forEach(icon => icon.addEventListener(`click`, (e) => {
    sessionStorage.setItem(`cat`, e.target.id)
    sessionStorage.setItem(`catTitle`, e.target.dataset.cater)

}))

//בדיקה שאני בדף קטוגריה והפעלת הפונקציות שיראו לי את המוצרים וכותרת הדף לפי הקטגוריה שנבחרה בתפריט הניווט בראש הדף
if (location.href.indexOf(`categoryPage`) != -1) {
    DisplayCategoryProductTitle()
    DisplayCategoryProduct()
}


//תפיסת אלמנט של תמונת המוצר בדף הקטגוריה ומעבר לדף המוצר באמצעות עדכון הקליק 
//SessionStorage - בעכבר ועדכון ה
let pagePro = document.querySelectorAll(`.pw_img`)
pagePro.forEach(product => product.addEventListener(`click`, (e) => {
    // console.log(e.target.dataset.serialn)
    sessionStorage.setItem(`currentProduct`, e.target.dataset.serialn)
    location.href = 'productPage.html';
}))

//בדיקה שאני בדף המוצר והפעלת הפונקציות שיראו לי את המוצר וכותרת הדף לפי הקטגוריה שנבחרה בתפריט הניווט בראש הדף
if (location.href.indexOf(`productPage`) != -1) {
    DisplayProductTitle()
    DisplayProduct()
}

//בדיקה שאנחנו נמצאים בדף ניהול המוצרים והפעלת הפונקציה של ניהול המוצרים
if (location.href.indexOf(`mangmentProducts`) != -1) {
    DisplayManagerItems()

}

//בדיקה שאנחנו נמצאים בדף ניהול משתמשים והפעלת הפונקציה של ניהול המשתמשים
if (location.href.indexOf(`usersManagement`) != -1) {
    DisplayManagerUsers()

}