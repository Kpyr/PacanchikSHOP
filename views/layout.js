module.exports = ({ content }) => {
    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Shop</title>
          
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
          <link href="/css/main.css" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
        </head>
  
        <body style="background-color: #ACD6D6">
          <header>
            <nav class="navbar navbar-top">
              <div class="container navbar-container">
                <div>
                  <ul class="social">
                    <li>
                      <a href=""><i class="fa fa-phone"></i> +7-800-555-35-35</a>
                    </li>
                    <li>
                      <a href=""><i class="fa fa-envelope"></i> shaylushay@eshop.com</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul class="social">
                    <li><a href="/admin/products">Профиль</i></a></li>
                  </ul>
                </div>
              </div>
            </nav>
            <nav class="navbar navbar-bottom" style="background-color: #ACD6D6">
              <div class="container navbar-container">
                <div>
                  <a href="/">
                    <h3 class="title" style="color: #4A7591">コック (PacanShop)</h3>
                  </a>
                </div>
                <div class="navbar-item">
                  <div class="navbar-buttons">
                    <div class="navbar-item">
                      <a href="/" style="color: #4A7591"><i class="fa fa-star"></i> Products</a>
                    </div>
                    <div class="navbar-item">
                      <a href="/cart" style="color: #4A7591"><i class="fa fa-shopping-cart"></i> Cart</a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
  
          ${content}
        </body>
      </html>
    `;
  };
  
