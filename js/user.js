class User {

    //תכונות המחלקה
    user_name //שם משתמש
    password //סיסמא
    first_name //שם פרטי
    last_name //שם משפחה
    email //אימייל
    birth_date //תאריך לידה
    city //עיר
    street //רחוב
    street_number //מספר רחוב




    //בנאי המחלקה- מקבל כפרמטרים את שם המשתמש, סיסמא, שם פרטי, שם משפחה, אימייל, מס' טלפון, כלי רכב מועדף ותאריך לידה
    constructor(u_name, pass, f_name, l_name, u_email, u_birth_date, u_city, u_street, u_street_number) {
        this.first_name = f_name
        this.user_name = u_name
        this.last_name = l_name
        this.password = pass
        this.email = u_email
        this.birth_date = u_birth_date
        this.city = u_city
        this.street = u_street
        this.street_number = u_street_number
    }
}