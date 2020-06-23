
    var app = new Vue({
      el: '#app',
      data: {
        message: 'Пользователь, вы загрузили эту страницу: ' + new Date().toLocaleString(),
        textColor: "black",
        defaultColor: "black",
        defaultPointer: true,
        addColor: false,
        variants: [
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
        updateTextColor: function(variantColor)
        {
            if (this.addColor === false)
            {
                this.textColor = variantColor                
            }
        },
        textDefaultColor: function()
        {
            if (this.addColor === false)
            {
                this.textColor = this.defaultColor               
            }
        },
        addColorText: function(variantColor)
        {
            this.addColor = false,
            this.updateTextColor(variantColor),
            this.addColor = true
        }
      }
    })