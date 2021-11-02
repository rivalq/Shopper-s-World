<template>
    <div class="container-fluid">
        <div class="row">
            <div id="carouselExampleCaptions" class="carousel carousel-dark slide carousel-fade" style="width: 100%" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="/images/hero-1.jpg" class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <p style="text-align: left">
                                <span style="color: rgb(229, 54, 55)"> WINTER COLLECTION </span>
                                <br />
                                <span style="font-size: 35px; font-weight: 600">
                                    Fall- Winter <br />
                                    Collections 2021
                                </span>
                                <br />
                                <span style="color: #3d3d3d">
                                    A specialist label creating luxury essentials.
                                    <br />
                                    Ethically crafted with an unwavering commitment
                                    <br />
                                    to exceptional quality.
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="/images/hero-2.jpg" class="d-block w-100" alt="..." />
                        <div class="carousel-caption text-left d-none d-md-block">
                            <p style="text-align: left">
                                <span style="color: rgb(229, 54, 55)"> WINTER COLLECTION </span>
                                <br />
                                <span style="font-size: 35px; font-weight: 600">
                                    Fall- Winter <br />
                                    Collections 2021
                                </span>
                                <br />
                                <span style="color: #3d3d3d">
                                    A specialist label creating luxury essentials.
                                    <br />
                                    Ethically crafted with an unwavering commitment
                                    <br />
                                    to exceptional quality.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div class="row mt-5 pt-5 justify-content-md-center">
            <div class="col-auto" style="text-align: center">
                <img src="/images/insta.png" width="690" height="532" alt="" />
            </div>
            <div class="col-auto pt-5">
                <span class="px-5 pt-5">
                    <h1>Instagram</h1>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    <br />
                    elit,sed do eiusmod tempor incididunt ut labore
                    <br />
                    et dolore magna aliqua.
                    <br />
                    <h4 class="mt-4" style="color: rgb(229, 54, 55)">#Shopper_World</h4>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.carousel-caption p {
    color: rgb(17, 17, 17);
}
</style>
