

const mapGetters = Vuex.mapGetters;


const slider = {
    data() {
        return {
           
        }
    },
    template: /*html*/ `

            <div class="row mt-5 justify-content-md-center">
                   <div @click = changeMenu :class="['col-sm-auto','py-1','cursor', selected_menu == 0 ? 'current_menu': 'text-muted']" style = "font-size:18px">Description</div> 
                   <div @click = changeMenu :class="['col-sm-auto','py-1','cursor', selected_menu == 1 ? 'current_menu': 'text-muted']" style = "font-size:18px">Features</div>
                   <div @click = changeMenu :class="['col-sm-auto','py-1','cursor', selected_menu == 2 ? 'current_menu': 'text-muted']" style = "font-size:18px">Reviews</div>
            </div>

    `,
    methods: {
        changeMenu(event) {
            var text = event.target.innerHTML;
            var temp;
            if (text[0] == 'D') temp = 0;
            else if (text[0] == 'F') temp = 1;
            else temp = 2;
            this.$store.commit("setSelectedMenu",temp);
        }
    },
    computed: {
          ...mapGetters({selected_menu:"getSelectedMenu"})
    }
}




const Description = {
    data() {
        return {

        }
    },
    template: /*html*/ `
        <div class="col">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultricies mi eget mauris pharetra et. Vel pretium lectus quam id leo in vitae turpis massa. Orci dapibus ultrices in iaculis nunc. At auctor urna nunc id cursus metus. Integer feugiat scelerisque varius morbi enim nunc. Aliquam sem et tortor consequat id porta nibh venenatis cras. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Malesuada nunc vel risus commodo viverra maecenas. Neque volutpat ac tincidunt vitae semper quis.
        </div>
    `,
}
const Features = {
    data() {
        return {

        }
    },
    template: /*html*/ `
        <div class="col">
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle 
        </div>
    `,
}
const Reviews = {
    data() {
        return {

        }
    },
    template: /*html*/ `
        <div class="col">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and go
        </div>
    `,
}

const dfr = {
    data() {
        return {
            selected:0,
        }
    },
    template: /*html*/ `
        <slider @slider = sliderChange ></slider>
        <div class="row mt-4">
            <Description v-show = "selected == 0"></Description>
            <Features  v-show = "selected == 2"></Features>
            <Reviews   v-show = "selected == 1"></Reviews>
        </div>
    `,
    methods:{
        sliderChange(selected){
            this.selected = selected;
        }
    }
}
