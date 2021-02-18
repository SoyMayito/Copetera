var control;

    document.addEventListener('DOMContentLoaded', function () {
      var options = new primitives.OrgConfig();

      var items = [
        new primitives.OrgItemConfig({
          id: 0,
          parent: null,
          title: "Ing. Juan Ricardo Andrade Ponce",
          description: "Presidente de COPETERA",
          image: "",
          phone: "tel",
          email: "correo",
          templateName: "contactTemplate",
          href: "#",
          itemTitleColor: primitives.Colors.Black
        }),
        new primitives.OrgItemConfig({
          id: 1,
          parent: 0,
          title: "Ing. Edgar Ricardo Gómez Navarro",
          description: "Vicepresidente de COPETERA",
          image: "",
          phone: "tel",
          email: "correo",
          templateName: "contactTemplate",
          href: "#",
          itemTitleColor: primitives.Colors.Green
        }),
        new primitives.OrgItemConfig({
          id: 2,
          parent: 1,
          title: "Ing. Sergio Rodas Martínez",
          description: "Secretario Propiertario Primero",
          image: "",
          phone: "tel",
          email: "correo",
          templateName: "contactTemplate",
          href: "#",
          itemTitleColor: primitives.Colors.Navy
        }),
          new primitives.OrgItemConfig({
          id: 3,
          parent: 1,
          title: "Ing. Eduardo de Jesús Sanchez Magaña",
          description: "Secretario Propiertario Segundo",
          image: "",
          phone: "tel",
          email: "correo",
          templateName: "contactTemplate",
          href: "#",
          itemTitleColor: primitives.Colors.Navy
        }),
          new primitives.OrgItemConfig({
          id: 4,
          parent: 1,
          title: "Ing. Javier Balderrama López",
          description: "Tesorero",
          image: "",
          phone: "tel",
          email: "correo",
          templateName: "contactTemplate",
          href: "#",
          itemTitleColor: primitives.Colors.Red
        }),
          new primitives.OrgItemConfig({
          id: 5,
          parent: 2,
          title: "Ing. Mario Gonzalez Perez",
          description: "Secretario Suplente Primero",
          image: "",
          phone: "tel",
          email: "correo",
          templateName: "contactTemplate",
          href: "#",
          itemTitleColor: primitives.Colors.Orange
        }),
          new primitives.OrgItemConfig({
          id: 6,
          parent: 3,
          title: "Ing. Salvador Moreno Rosas",
          description: "Secretario Suplente Segundo",
          image: "",
          phone: "tel",
          email: "correo",
          templateName: "contactTemplate",
          href: "#",
          itemTitleColor: primitives.Colors.Orange
        }),
          new primitives.OrgItemConfig({
          id: 7,
          parent: 4,
          title: "Ing. Ricardo Angel López Otero",
          description: "Subtesorero",
          image:"",
          phone: "tel",
          email: "correo",
          templateName: "contactTemplate",
          href: "#",
          itemTitleColor: primitives.Colors.Red
        })
      ];

      options.items = items;
      options.cursorItem = 0;
      options.templates = [getContactTemplate()];
      options.onItemRender = onTemplateRender;

      control = primitives.OrgDiagram(document.getElementById("basicdiagram"), options);


      function onTemplateRender(event, data) {
        var itemConfig = data.context;
        var element = data.element;

        if (data.templateName == "contactTemplate") {
          var photo = data.element.childNodes[1].firstChild;
          photo.src = itemConfig.image;
          photo.alt = itemConfig.title;

          var titleBackground = element.firstChild;
          titleBackground.style.backgroundColor = itemConfig.itemTitleColor || primitives.Colors.RoyalBlue;

          var title = element.firstChild.firstChild;
          title.textContent = itemConfig.title;

          var phone = element.childNodes[2];
          phone.textContent = itemConfig.phone;

          var email = element.childNodes[3];
          email.textContent = itemConfig.email;
          email.href = ("mailto:" + itemConfig.email + "?Subject=Hello%20again");

          var description = element.childNodes[4];
          description.textContent = itemConfig.description;

          var readmore = element.childNodes[5];
          readmore.href = itemConfig.href;

          switch (data.renderingMode) {
            case primitives.RenderingMode.Create:
              /* Initialize template content here */
              readmore.addEventListener("click", function (e) {
                /* Block mouse click propagation in order to avoid layout updates before server postback*/
                primitives.stopPropagation(e);
              });
              email.addEventListener("click", function (e) {
                /* Block mouse click propagation in order to avoid layout updates before server postback*/
                primitives.stopPropagation(e);
              });
              break;
            case primitives.RenderingMode.Update:
              /* Update template content here */
              break;
          }
        }
      }

      function getContactTemplate() {
        var result = new primitives.TemplateConfig();
        result.name = "contactTemplate";

        result.itemSize = new primitives.Size(220, 120);
        result.minimizedItemSize = new primitives.Size(3, 3);

        /* the following example demonstrates JSONML template see http://http://www.jsonml.org/ for details: */
        result.itemTemplate = ["div",
          {
            "style": {
              width: result.itemSize.width + "px",
              height: result.itemSize.height + "px"
            },
            "class": ["bp-item", "bp-corner-all", "bt-item-frame"]
          },
          ["div",
            {
              "name": "titleBackground",
              "class": ["bp-item", "bp-corner-all", "bt-title-frame"],
              "style": {
                top: "2px",
                left: "2px",
                width: "216px",
                height: "20px"
              }
            },
            ["div",
              {
                "name": "title",
                "class": ["bp-item", "bp-title"],
                "style": {
                  top: "3px",
                  left: "6px",
                  width: "208px",
                  height: "18px"
                }
              }
            ]
          ],
          ["div",
            {
              "class": ["bp-item", "bp-photo-frame"],
              "style": {
                top: "26px",
                left: "2px",
                width: "50px",
                height: "60px"
              }
            },
            ["img",
              {
                "name": "photo",
                "class": ["bp-item", "bp-title"],
                "style": {
                  width: "50px",
                  height: "60px"
                }
              }
            ]
          ],
          ["div",
            {
              "name": "phone",
              "class": "bp-item",
              "style": {
                top: "26px",
                left: "56px",
                width: "162px",
                height: "18px",
                fontSize: "12px"
              }
            }
          ],
          ["a",
            {
              "name": "email",
              "class": "bp-item",
              "style": {
                top: "44px",
                left: "56px",
                width: "162px",
                height: "18px",
                fontSize: "12px"
              }
            }
          ],
          ["div",
            {
              "name": "description",
              "class": "bp-item",
              "style": {
                top: "62px",
                left: "56px",
                width: "162px",
                height: "36px",
                fontSize: "12px"
              }
            }
          ],
          ["a",
            {
              "name": "readmore",
              "class": "bp-item",
              "style": {
                top: "104px",
                left: "4px",
                width: "212px",
                height: "12px",
                fontSize: "10px",
                fontFamily: "Arial",
                textAlign: "right",
                fontWeight: "bold",
                textDecoration: "none"
              }
            },
            "Read more ..."
          ]
        ];
        return result;
      }
    })