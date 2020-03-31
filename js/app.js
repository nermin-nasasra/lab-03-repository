
'use strict';
let keywordAll = [];
let hornAll = [];
$(document).ready(function () {
    function Img(img) {
        this.image_url = img.image_url;
        this.title = img.title;
        this.description = img.description;
        this.keyword = img.keyword;
        this.horns = img.horns;
        hornAll.push(this);
    }
    Img.prototype.render = function () {
        let $hornClone = $("#photo-template").html();
        var reender = Mustache.render($hornClone, this);
        $("main").append(reender);
    };
    Img.prototype.selectt = function () {
        let imageSelect = $('.selectOption');
        if (!(keywordAll.includes(this.keyword))) {
            keywordAll.push(this.keyword);
            imageSelect.append(`<option>${this.keyword}</option>`);
        }
    };
    const readJson = () => {
        $.ajax("../data/page-1.json", { method: "get", dataType: "JSON" }).then(data => {
            hornAll = [];
            $('main').empty();
            data.forEach(hornItem => {
               
                let hhorn = new Img(hornItem);
                hhorn.selectt();
                hhorn.render();
            });
        });
    };
    readJson();
    const readJson1 = () => {
        $.ajax("../data/page-2.json", { method: "get", dataType: "JSON" }).then(data => {
            hornAll = [];
                $('main').empty();
            data.forEach(hornItem => {
                
                let hhorn = new Img(hornItem);
                hhorn.selectt();
                hhorn.render();
            });
        });
    };
    $('.selectOption').change(function () {
        var selectedKey = $(this).children('option:selected').val();
        keywordAll.forEach(function (val) {
            if (selectedKey === val) {
                $('div').hide();
                $(`.${val}`).show();
            }
        })
    })

    let pageOneSelector = () => {
        $('div').remove();
        keywordAll.splice(0, keywordAll.length);
        $('.selectOption').empty('');
        readJson();

    };
    let pageTwoSelector = () => {   
        $('div').remove();
        keywordAll.splice(0, keywordAll.length);
        $('.selectOption').empty('');
        readJson1();
    };
    $('#pageone').on('click', pageOneSelector);
    $('#pagetwo').on('click', pageTwoSelector);

    const SelectSort1 = () => {
        hornAll.sort((a, b) => {
            if (a.title.toUpperCase() < b.title.toUpperCase()) {
                return -1;
            }else if(a.title.toUpperCase() > b.title.toUpperCase()){
                return 1;
            }
        });
        $('main').empty('');
        console.log(hornAll);
        hornAll.forEach(val =>{
            val.render();
        })
    }
    const SelectSort2 = () => {
        hornAll.sort((a, b) => {
            return a.horns - b.horns;
        });
        $('main').empty();
        hornAll.forEach(val =>{
            val.render();
        })
    }
    $('#titlee').on('click', SelectSort1);
    $('#no').on('click', SelectSort2);
});