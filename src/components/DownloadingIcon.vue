<template>
    <div class="box">
        <div class="lds-dual-ring"></div>
    </div>
</template>
<style scoped>
    html {
        height: 100%;
    }

    body {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        min-height: 100%;
        overflow: hidden;
    }

    .lds-dual-ring {
        display: inline-block;
        width: 30px;
        height: 30px;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 20px;
        height: 20px;
        margin: 4px;
        border-radius: 50%;
        border: 2px solid #2d3691;
        border-color: #2d3691 transparent #2d3691 #2d3691 ;
        animation: lds-dual-ring 5s linear infinite;
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>
