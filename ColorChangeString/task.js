    var app = new Vue({
      el: '#app',
      data: {
        message: 'Пользователь, вы загрузили эту страницу: ' + new Date().toLocaleString(),
        addColor: false,
        idVariants: 0,
        idUlLi: 0,
        defaultPointer: true,
        variants: [
          {
            variantText: "Черный",
            variantColor: "black"
          },
          {
            variantText: "Красный",
            variantColor: "red"
          },
          {
            variantText: "Зеленый",
            variantColor: "green"
          },
          {
            variantText: "Синий",
            variantColor: "blue"
          },
          {
            variantText: "Оранжевый",
            variantColor: "orange"
          },
          {
            variantText: "Серый",
            variantColor: "grey"
          }
        ]
      },
      methods: {
        updateTextColor(index)
        {
            if (this.addColor === false)
            {
                this.idVariants = index                
            }
        },
        textDefaultColor()
        {
            if (this.addColor === false)
            {
                this.idVariants = 0             
            }
        },
        addColorText(index)
        {
            this.addColor = false,
            this.updateTextColor(index),
            this.addColor = true
        }
      },
      computed: {
          styleColor()
          {
              return this.variants[this.idVariants].variantColor
          }
      }
    })