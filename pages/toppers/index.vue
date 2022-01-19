<template>
  <div class="toppers">
    <div class="toppers-content">
      <h1 class="title-toppers" style="color: black">
        Hulp nodig bij het vinden van het juiste product? Wij hebben dé
        <strong>toppers</strong> voor je verzameld!
      </h1>

      <div class="toppers-collections">
        <!-- collect1 -->
        <div class="collection" style="position: relative">
          <div class="description">
            <!-- image -->
            <div class="image">
              <img src="/icons/Bluetooth headset.png" />
            </div>
            <!-- titre -->
            <div class="description-title color-Koptelefoons">Koptelefoons</div>
            <!-- top titile -->
            <div class="title-collection background-Koptelefoons">TOP 20</div>
          </div>
        </div>
        <!-- collect2 -->

        <div class="collection" style="position: relative">
          <div class="description">
            <!-- image -->
            <div class="image">
              <img src="/icons/Smart TV.png" />
            </div>
            <!-- titre -->
            <div class="description-title color-Smart">Smart TV's</div>
            <!-- top titile -->
            <div class="title-collection background-smart">TOP 50</div>
          </div>
        </div>
        <!-- collect3 -->

        <div class="collection" style="position: relative">
          <div class="description">
            <!-- image -->
            <div class="image">
              <img src="/icons/Stofzuiger.png" />
            </div>
            <!-- titre -->
            <div class="description-title color-Stofzuigers">Stofzuigers</div>
            <!-- top titile -->
            <div class="title-collection background-Stofzuigers">TOP 20</div>
          </div>
        </div>

        <!-- collect4 -->

        <div class="collection" style="position: relative">
          <div class="description">
            <!-- image -->
            <div class="image">
              <img src="/icons/Laptop.png" />
            </div>
            <!-- titre -->
            <div class="description-title color-Laptops">Laptops</div>
            <!-- top titile -->
            <div class="title-collection background-laptops">TOP 20</div>
          </div>
        </div>

        <!-- collect5 -->

        <div class="collection" style="position: relative">
          <div class="description">
            <!-- image -->
            <div class="image">
              <img src="/icons/Camera.png" />
            </div>
            <!-- titre -->
            <div class="description-title color-Camera">Camera's</div>
            <!-- top titile -->
            <div class="title-collection background-Camera">TOP 50</div>
          </div>
        </div>

        <!-- collect6 -->

        <div class="collection" style="position: relative">
          <div class="description">
            <!-- image -->
            <div class="image">
              <img src="/icons/Airco.png" />
            </div>
            <!-- titre -->
            <div class="description-title color-Airoc">Airoc's</div>
            <!-- top titile -->
            <div class="title-collection background-Airoco">TOP 10</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.toppers .container {
  height: 100%;
  display: grid;
  justify-content: center;
}
.toppers {
  display: grid;
  height: 100%;
  color: white;
}
.toppers-content {
  display: grid;
  align-self: center;
  grid-template-columns: 1fr;
  column-gap: 50px;
  row-gap: 50px;
  grid-template-rows: max-content max-content min-content;
  grid-template-areas:
    "title"
    "toppers-collections"
    "stores";
}

.title-toppers {
  grid-area: title;
  text-align: center;
  margin-top: 50px;
  padding: 0 8% 5%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 42px;
  line-height: 63px;
}

.toppers-collections {
  display: grid;
  color: black;
  font-family: "Poppins";
  grid-area: toppers-collections;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 50px;
  row-gap: 50px;
  justify-content: center;
  align-content: center;
}

.toppers-collections .collection {
  height: 150px;
  min-height: 120px;
  display: grid;
  align-content: center;
  background: #ffffff;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 45px;
  grid-template-columns: 1fr;
  box-shadow: 2px 2px 16px 6px rgba(0, 0, 0, 0.15);
  grid-template-areas: "description";
  cursor: pointer;
}

.toppers-collections .collection:hover {
  box-sizing: none;
  border: 4px solid rgba(95, 53, 126, 0.45);
}

.toppers-collections .collection .description image {
  grid-area: image;
  align-self: center;
  width: 70px;
  height: 70px;
  padding: 10px;
  padding-left: 20px;
}

.toppers-collections .collection .description {
  grid-area: description;
  align-self: center;
  display: grid;
  align-content: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0 10px 0 0;
  grid-template-columns: 1fr 3fr;
  grid-template-areas: "image description-title";
}
.toppers-collections .collection .description .title-collection {
  position: absolute;
  display: grid;
  justify-content: center;
  align-content: center;
  top: -32px;
  right: 15px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 16px;
  color: white;
  padding: 10px;
  width: 88px;
  height: 45px;
}
.background-Koptelefoons {
  background: linear-gradient(90deg, #c84e89 0%, #f15f79 100%);
}
.background-smart {
  background: linear-gradient(90deg, #314755 0%, #26a0da 100%);
}
.background-Stofzuigers {
  background: linear-gradient(90deg, #c84e89 0%, #f15f79 100%);
}
.background-laptops {
  background: linear-gradient(90deg, #314755 0%, #26a0da 100%);
}
.background-Camera {
  background: linear-gradient(90deg, #614385 0%, #516395 100%);
}
.background-Airoco {
  background: linear-gradient(90deg, #614385 0%, #516395 100%);
}

.color-Smart,
.color-Stofzuigers,
.color-Camera,
.color-Airoc {
  color: #4f8998;
}
.color-Koptelefoons,
.color-Laptops {
  color: #5d4a85;
}
.toppers-collections .collection .description .description-title {
  grid-area: description-title;
  font-size: 22px;
  font-weight: 800;
  margin: 10px;
  /* color: #4f8998; */
  background: linear-gradient(90deg, #5f347d 0%, #49a09d 150%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.toppers-collections .collection:hover {
  background: #f4f4f482;
}
@media (max-width: 768px) {
  /* .collection {
    grid-template-columns: 1fr 1fr;
  } */
  .links {
    grid-template-columns: 1fr;
    grid-template-areas: "green-button";
  }
}
.toppers-collections .collection img {
  display: grid;
  justify-content: center;
  align-content: center;
  display: block;
  max-width: 100%;
  height: auto;
}
@media (max-width: 992px) {
  .toppers-content {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 15px;
    row-gap: 50px;
    grid-template-rows: max-content;
    grid-template-areas:
      "title"
      "toppers-collections"
      "stores";
  }
  .toppers .product-info {
    display: contents;
  }
  .toppers-collections {
    grid-template-rows: max-content;
    column-gap: 20px;
    grid-row-gap: 40px;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 1264px) {
  .colllection {
    padding: 30px;
  }
  .toppers-collections .collection .description .description-title {
    font-size: 15px;
  }
}

@media (max-width: 600px) {
  .title-toppers {
    grid-area: title;
    font-size: 28px;
    text-align: center;
    padding: 0% 5% 0;
    font-family: "Poppins";
    line-height: 1.5;
  }
  .toppers-collections {
    grid-template-columns: 1fr;
  }
  .toppers-collections .collection .description .title-collection {
    border-radius: 50%;
    background: linear-gradient(90deg, #c84e89 62.5%, #f15f79 162.5%);
    font-size: 18px;
    padding: 10px;
    width: 80px;
    height: 80px;
  }
  .toppers-collections .collection .description .description-title {
    font-size: 22px;
  }
  .toppers-collections .collection {
    margin: 0 30px;
    height: 100px;
  }
}

@media (max-width: 480px) {
  .toppers-collections .collection .description .title-collection {
    font-size: 16px;
    width: 50px;
    height: 50px;
  }
  .toppers-collections .collection {
    height: 70px;
  }

  .toppers-collections .collection .description .title-collection {
    width: 60px;
    height: 60px;
  }

  .toppers-collections .collection .description .description-title {
    font-size: 20px;
  }
  .title-toppers {
    font-size: 24px;
  }
}
@media (max-width: 390px) {
  .title-toppers {
    font-size: 22px;
  }
  .toppers-collections .collection {
    margin: 0 1px;
    height: 60px;
  }

  .toppers-collections .collection .description .title-collection {
    width: 47px;
    height: 47px;
    font-size: 12px;
  }

  .toppers-collections .collection .description .description-title {
    font-size: 18px;
  }
}
</style>
