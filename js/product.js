class Product {

    //תכונות מחלקת מוצרים
    serialN //מספר סידורי המכיל אותיות וספרות
    nameP // שם המוצר
    priceOriginalP // מחיר המוצר כמספר עשרוני
    finalePriceP
    descriptionP // תיאור המוצר
    inCart //כמות הפעמים שהמוצר נמצא בעגלה
    img //תמונה של המוצר


    //בנאי המחלקה המקבל כפרמטרים את - מספר סידורי, שם המוצר, מחיר המוצר, תמונה של המוצר,תיאור המוצר , קטגוריית מוצר
    constructor(serialN, nameP, priceOriginalP, finalePriceP, descriptionP, category, img) {
        this.serialN = serialN;
        this.nameP = nameP;
        this.priceOriginalP = priceOriginalP;
        this.finalePriceP = finalePriceP;
        this.descriptionP = descriptionP;
        this.category = category;
        this.img = img
        this.inCart = 0;
    }

}