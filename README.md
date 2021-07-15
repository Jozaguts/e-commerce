|<img src="https://www.blizg.com/wp-content/uploads/2020/05/1200px-Vue.js_Logo_2.svg-768x666.png" width="200">    |      <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"> | 
|:----------:|:-------------:|
| vue: ^2.6.14 |  laravel / framework: ^8.40| 
| vue-router: ^3.5.1 | spatie / laravel-medialibrary: ^9.0.0   | 
| vuetify: ^2.5.3| laravel / passport: ^10.1 |
|vuex-persistedstate: ^4.0.0-beta.3|  |
|vuex ^3.6.2|  |


#about this project
This Shop consists of two things, a Client facing and an Admin facing interface.

Client Facing:

    A landing page to display all the products of the Shop (catalog page).
    
    A page for the details of the products
    
    A checkout page

Admin Facing:
    
    A full functional login
    
    A CRUD (Create, Read, Update, Delete) interface for Users
    
    A CRUD interface for Products


##Routes and Endpoints
Client Facing Routes:
    
    The main site will be on the / route
    
    The product details on the /product-name example: /cinnamon-supplement
    
    The checkout process on the /checkout

Admin Facing Routes:
    
    The login needs to be on a /login route (Laravel’s default)
    
    The admin needs to be on a /admin route
    
    The products admin on a /admin/users
    
    The products admin on a /admin/products
##API Routes

    /api/products
    
    /api/users


##init:

    composer install
    php artisan passport:install
    php artisan migrate --seed
    npm install

##run:

    php artisan serve 
    npm run watch
make sure that you are running on port 8000 and localhost http://127.0.0.1 if isn't you can change your proxy on laravelmix file webpack.mix.js
