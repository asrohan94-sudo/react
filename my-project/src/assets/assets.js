import p_img51 from './p_img51.png'
import p_img52 from './p_img52.png'
import category_img1 from './category_img1.png'
import category_img2 from './category_img2.png'
import category_img3 from './category_img3.png'


import star from './star.png'
import exam from './man.png'
import note from './note.png'
import check from './chek.png'
import logo from './logo.PNG'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'
import r1 from './r1.png'
import r2 from './r2.png'
import r3 from './r3.png'
import r4 from './r4.png'
import r5 from './r5.png'
import r6 from './r6.png'
import r7 from './r7.png'
import r8 from './r8.png'
import r9 from './r9.png'
import r10 from './r10.png'

import mejbaur from './mejbaur.png'
import Nirjarony from './Nirjarony.png'
import Reza from './Reza.png'
import sanjida from './sanjida.png'

export const assets = {
    star,
    exam,
    note,   
    check,
    r1,
    r2,
    r3,
    r4,
    r5,
    r6,
    r7,
    r8,
    r9,
    r10,
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon,

    // Team images
    mejbaur,
    sanjida,
    reza: Reza,        // consistent name
    meghla: Nirjarony, // use actual file name!
}


export const products = [
   
     {
        _id: "1",
        name: "CU+Agri+RU ডেডিকেটেড ব্যাচ", // Bangla name for the card title
        description: "কম সময়ে অগোছালো প্রস্তুতির এক গোছালো সমাধান CU+Agri+RU ডেডিকেটেড ব্যাচ। যদি তোমার দরকার হয় সম্প...", // Bangla description
        price: 320,
        image: [category_img1],
        category: "Medical",
        mark: "60",
        time: "5 min",
        group:"https://t.me/+HfjmEZOlwFM2NGVl",
        subCategory: "University Admission",
        details: {
            exams: 60 ,
            notes: 150,
            features: 10
        },
        bestseller: true
    },
    {
        _id: "2",
        name: "Gk final exam", // Bangla name for the card title
        description: "কম gk ডেডিকেটেড ব্যাচ। যদি তোমার দরকার হয় সম্প...", // Bangla description
        price: 499,
        image: [category_img2],
        mark: "60",
        time: "9 min",
        category: "Essential",
        group:"https://t.me/+HfjmEZOlwFM2NGVl",
        subCategory: "University Admission",
        details: {
            exams: 6,
            notes: 1,
            features: 10
        },
    
    },
    
     {
        _id: "3",
        name: "Love is nothing", // Bangla name for the card title
        description: "কম সময়ে অগোছালো love এক গোছালো সমাধান CU+Agri+RU ডেডিকেটেড ব্যাচ। যদি তোমার দরকার হয় সম্প...", // Bangla description
        price: 499,
        image: [category_img3],
        mark: "60",
        time: "7 min",
        group:"https://t.me/+HfjmEZOlwFM2NGVl",
        category: "Versity",
        subCategory: "University Admission",
        details: {
            exams: 600,
            notes: 15,
            features: 10
        },
        bestseller: true
        
    },

]
