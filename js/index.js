// import { baseUrl } from "./api";

const bannerImg = document.querySelector(".hero-banner"); 

const url = "http://semesterproject2-louise.herokuapp.com/home"; 

async function fetchBanner() {
        const response = await fetch(url);
        const json = await response.json();
        
        console.log(json); 

        bannerImg.innerHTML += `<div class="hero-banner">
        <img src="https://res.cloudinary.com/ds11k4hlu/image/upload/v1650892531/small_large_jakob_owens_Jz_J_Syb_P_Fb3s_unsplash_0840f6de0c_04bc925498.jpg"${json.hero_banner.url} alt="hero banner image">
        </div>`; 
    }

    fetchBanner(); 

    const featuredUrl = "http://semesterproject2-louise.herokuapp.com/products"; 

    const featuredContainer = document.querySelector(".featured-container");

    async function getFeatured() {

        try {
            const response = await fetch(featuredUrl);
            const json = await response.json(); 
            console.log(json); 

            for (let i = 0; i < json.length; i++) {
                if(json[i].featured === true) {
                featuredContainer.innerHTML += `<a class="featured" href="products.html?id">
                <h4>${json[i].title}</h4>
                <img src=${json[i].image.url}>
                <p>Price: ${json[i].price}</p>
                </a>`; 
            }
        }

        } catch (error){
            console.log(error); 
        }
    }
    getFeatured();