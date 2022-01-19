<template>
  <div class="homepage">
    <div class="homepage-content">
      <h1 class="title" style="font-weight: 500">
        Eenvoudig populaire producten vergelijken van de grootste aanbieders.
      </h1>
      <div class="top-collections">
        <nuxt-link
          v-for="(item, i) of brands"
          :key="i"
          :to="item.path"
          class="remove-style"
        >
          <div class="collection">
            <div class="image">
              <img
                :src="sizeImage(item.image, 200, 200)"
                class="lazy"
                :alt="item.name"
              />
            </div>
            <div class="description">
              <div class="description-title">
                {{ item.title }}
              </div>
              <div class="description-subtitle">
                {{ item.description }}
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="stores">
        <!--
        <div class="store">
          <a href="https://partner.bol.com/click/click?p=2&t=url&s=53519&f=TXL&url=https%3A%2F%2Fwww.bol.com%2Fnl%2F&name=de%20winkel%20van%20ons%20allemaal&subid=homepage" target="_blank">
            <img
              :src="sizeImage('Bol-Logo-Small.png',150,150)"
              class="lazy"
              alt="Bol.com"
            >
          </a>
        </div>
        <div class="store">
          <a href="https://www.coolblue.nl" target="_blank">
            <img
              :src="sizeImage('Coolblue.png',150,150)"
              class="lazy"
              alt="Coolblue"
            >
          </a>
        </div>
        <div class="store">
          <a href="https://www.amazon.nl" target="_blank">
            <img
              :src="sizeImage('Amazon.png',150,150)"
              class="lazy"
              alt="Amazon"
            >
          </a>
        </div> -->
        <nuxt-link to="/category/alle-producten" class="remove-style">
          <div class="button button2">
            <span>Bekijk alle categorieën</span>
          </div>
        </nuxt-link>
      </div>
    </div>
    <style v-if="layout && layout.css" type="text/css">
      {{ layout.css }}
    </style>
  </div>
</template>

<script>
import { getLayout } from "~/components/API.js";

export default {
  async asyncData({ params, query, error }) {
    const layout = await getLayout("homepage");
    return { layout };
  },
  data() {
    return {
      dialog: false,
      brands: [
        {
          path: "/toppers/beste-mobiele-airco-s-2021",
          title: "Airco",
          description: "Voor de warme dagen",
          image: "/icons/Airco.png",
        },
        {
          path: "/toppers/beste-draadloze-koptelefoons-2021",
          title: "Bluetooth headset",
          description: "De beste kwaliteit geluid",
          image: "/icons/Bluetooth headset.png",
        },
        // { path: '/toppers/camera', title: 'Camera', description: 'Mooie momenten vastleggen', image: '/icons/  Camera.png' },
        // { path: '/toppers/laptop', title: 'Laptop', description: 'Snel, compact en betrouwbaar', image: '/icons/Laptop.png' },
        {
          path: "/toppers/beste-smart-tv-2021",
          title: "Smart TV",
          description: "Lekker gamen of streamen",
          image: "/icons/Smart TV.png",
        },
        {
          path: "/toppers/beste-stofzuigers-2021",
          title: "Stofzuiger",
          description: "Elke kruimel de baas",
          image: "/icons/Stofzuiger.png",
        },
      ],
    };
  },
  head(ctx) {
    const link = [];
    if (process.env.NODE_ENV === "production") {
      link.push({ rel: "canonical", href: "https://www.rovara.nl" });
    }

    return {
      title: "Home",
      link,
    };
  },
  mounted() {
    // document.head.append('<!-- TT -->')
  },
  methods: {
    sizeImage(image, width, height, imagetype = "brand") {
      return image;
      // return sizeImage(image, width, height, imagetype)
    },
  },
};
</script>

<style lang="css">
.homepage .container {
  height: 100%;
  display: grid;
  justify-content: center;
}
.homepage {
  display: grid;
  height: 100%;
  color: white;
}
.homepage-content {
  display: grid;
  align-self: center;
  grid-template-columns: 1fr;
  column-gap: 50px;
  row-gap: 50px;
  grid-template-rows: max-content max-content min-content;
  grid-template-areas:
    "title"
    "top-collections"
    "stores";
}
.links {
  grid-area: links;
  width: 100%;
}
.stores {
  grid-area: stores;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
}
.stores .store {
  padding-right: 20px;
}
.stores-info {
  grid-area: stores-info;
  align-content: end;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content max-content max-content;
  display: grid;
  grid-template-areas:
    "title"
    "top-collections"
    "stores";
}

.title {
  grid-area: title;
  padding-bottom: 10px;
  font-size: 46px;
  line-height: 55px;
  text-align: center;
  margin-top: 50px;
  padding: 0% 5% 5% 5%;
  font-family: "Poppins";
  line-height: 1.5;
}

.intro-info-text {
  grid-area: info-text;
  padding-bottom: 20px;
  font-size: 18px;
}
.top-collections {
  display: grid;
  color: black;
  font-family: "Poppins";
  grid-area: top-collections;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 45px;
  row-gap: 10px;
  grid-template-rows: 160px 160px;
  justify-content: center;
  align-content: center;
}

.links {
  grid-area: links;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 15px;
  row-gap: 15px;
  grid-template-rows: max-content;
  grid-template-areas: "green-button explain-button";
}
.button-productpage {
  grid-area: green-button;
}
.button-explain-productpage {
  grid-area: explain-button;
}

.top-collections .collection {
  min-height: 120px;
  display: grid;
  align-content: center;
  background: #f4f4f4;
  border-radius: 8px;
  padding: 0 10px 0 0;
  grid-template-columns: 1fr 3fr;
  box-shadow: 5px 3px 22px 1px rgb(0 0 0 / 42%);
  grid-template-areas: "image description";
}
.top-collections .collection .image {
  grid-area: image;
  align-self: center;
  padding: 10px;
  padding-left: 20px;
}
.top-collections .collection .description {
  grid-area: description;
  align-self: center;
}
.top-collections .collection .description .description-title {
  font-size: 22px;
  font-weight: 800;
  color: #4f8998;
}
.top-collections .collection .description .description-subtitle {
  font-size: 15px;
  font-weight: 500;
}
.top-collections .collection:hover {
  background: #f4f4f482;
}
@media (max-width: 768px) {
  .top-collections {
    grid-template-columns: 1fr 1fr;
  }
  .links {
    grid-template-columns: 1fr;
    grid-template-areas: "green-button";
  }
}
.top-collections .collection img {
  display: block;
  max-width: 100%;
  height: auto;
}
@media (max-width: 992px) {
  .homepage-content {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 15px;
    row-gap: 50px;
    grid-template-rows: max-content;
    grid-template-areas:
      "title"
      "top-collections"
      "stores";
  }
  .homepage .product-info {
    display: contents;
  }
  .top-collections {
    grid-template-rows: max-content;
    column-gap: 20px;
    grid-row-gap: 40px;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .title {
    grid-area: title;
    font-size: 30px;
    text-align: center;
    padding: 4% 5% 0% 5%;
    font-family: "Poppins";
    line-height: 1.5;
  }
  .top-collections {
    grid-template-columns: 1fr;
  }
}
/*
  @media (max-width:600px) {
    .stores {
      flex-wrap:wrap;
      justify-content: center;
    }
  }
  @media (max-width: 560px) {
    .header-content {
      flex-direction:column;
      row-gap:10px;
    }
}*/
</style>
