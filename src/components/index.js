import ImageView from '@/components/ImgView/index.vue'
import Sku from '@/components/XtxSku/index.vue'


export const componentPlugins={
  install(app){
    app.component('XtxImageView',ImageView)
    app.component('XtxSku',Sku)

  }
}
