
            function addBook()
            {
                var dbusrname = window.localStorage.getItem("username");
                var dbbookname = document.getElementById('J_title').value;
                var dbprice = document.getElementById('J_price').value;
                var dbrating = document.getElementById('J_rating').value;
                var dbauthor = document.getElementById('J_author').value;
                var dbsubtitle = document.getElementById('J_subtitle').value;
                var dbags = document.getElementById('J_tags').value;
                var dbimgulr = document.getElementById('J_img').value;
                var dbbinding = document.getElementById('J_binding').value;
                var dbtranslator = document.getElementById('J_trans').value;
                var dbpages = document.getElementById('J_pages').value;
                var dbcatalog = document.getElementById('J_catalog').value;
                var dbpublisher = document.getElementById('J_publisher').value;
                var dbisbn10 = document.getElementById('J_isbn10').value;
                var dbisbn13 = document.getElementById('J_isbn13').value;
                var dburl = document.getElementById('J_douurl').value;
                var dbsummary = $('#J_summary').val();
                var dbsummary_o = document.getElementById('J_summary').value;
                
                var dboption ="0";
                if(document.getElementById('J_option').checked)
                {
                    dboption = "1"
                } 
              
                var d = new Date();
                var curr_date = d.getDate();
                var curr_month = d.getMonth() + 1; //Months are zero based
                var curr_year = d.getFullYear();

                var dstr = curr_year + "-" + curr_month + "-" + curr_date;
    
                j = { title: dbbookname, isbn: ''+dbisbn13, isPersonal:dboption, created_date:dstr,ownerid:dbusrname,author:dbauthor,imgurl:dbimgulr,averageRate:dbrating,price:dbprice,url:dburl    };
                jsonstr = JSON.stringify(j);
                $.ajax({
                    type: 'POST',
                    url: BASE_URL+'/book/_insert',
                    dataType: 'json',
                    timeout: 5000,
                    data: 'docs=['+jsonstr+']',

                    success: function(value,status)
                    {
                        alert('add successfully');
                        document.getElementById("bookinfo").style.display="none";
                        document.getElementById("barcode").style.display="block";

                    },
                    error: function(status)
                    {
                        alert('add failed');
                        document.getElementById("bookinfo").style.display="none";
                        document.getElementById("barcode").style.display="block";
                    }
                })
            }

            function getBookDetail(isbn)
            {
                $.ajax({
                    type: 'GET',
                    url: 'https://api.douban.com/v2/book/isbn/:'+isbn,
                    dataType: 'jsonp',
                    timeout: 5000,

                    success: function(rValue, status) {
                        
                        document.getElementById("bookinfo").style.display="block";

                        var tbl     = document.createElement("table");
                        var tblBody = document.createElement("tbody");
                        tbl.appendChild(tblBody);

                        var bookform = document.getElementById("bk_detail");
                        bookform.appendChild(tbl);
                        var htmlbr = document.createElement("br");
                        //var obj = eval('('+rValue+')')
                        var img_obj = document.createElement("img");
                        img_obj.id = "J_imgshow";
                        img_obj.src= rValue.image;

                        var imgRow = document.createElement("tr");
                        var imgCell = document.createElement("td");
                        imgCell.appendChild(img_obj); 
                        imgRow.appendChild(imgCell);
                        tblBody.appendChild(imgRow);


                        var secondRow = document.createElement("tr");
                        var titleCell = document.createElement("td");

                        var title_text = document.createElement("input");
                        var bkname = document.createElement("input");
                        title_text.id="J_title"; 
                        title_text.type = "text";  
                        title_text.name = "title";  
                        title_text.value = rValue.title;
                        title_text.class="ordinary";
                        bkname.type="button";
                        bkname.value="书名";
                        titleCell.appendChild(bkname);
                        titleCell.appendChild(title_text);


                        var priceCell = document.createElement("td");
                        var price_text = document.createElement("input");
                        var bkprice = document.createElement("input"); 
                        price_text.id="J_price";
                        price_text.type = "text";  
                        price_text.name = "price";  
                        price_text.value = rValue.price;
                        price_text.class="ordinary";
                        bkprice.type="button";
                        bkprice.value="价格";
                        priceCell.appendChild(bkprice);
                        priceCell.appendChild(price_text);

                        secondRow.appendChild(titleCell);
                        secondRow.appendChild(priceCell);
                        tblBody.appendChild(secondRow);                        

                        
                        var thirdRow = document.createElement("tr");
                        var ratingCell = document.createElement("td");
                        var authorCell = document.createElement("td");

                        var ratring_text =  document.createElement("input");
                        var bkratring =  document.createElement("input");
                        ratring_text.id="J_rating"
                        ratring_text.type = "text";  
                        ratring_text.name = "ratring";  
                        ratring_text.value = rValue.rating.average; 
                        ratring_text.class="ordinary";
                        bkratring.type="button";
                        bkratring.value="评分";
                        ratingCell.appendChild(bkratring);
                        ratingCell.appendChild(ratring_text);


                        var author_text =  document.createElement("input");
                        var bkauthor =  document.createElement("input"); 
                        author_text.id="J_author";   
                        author_text.type = "text";  
                        author_text.name = "author";  
                        author_text.value = rValue.author[0]; 
                        author_text.class="ordinary"; 
                        bkauthor.type="button";
                        bkauthor.value="作者";
                        authorCell.appendChild(bkauthor);                        
                        authorCell.appendChild(author_text);
                        thirdRow.appendChild(ratingCell); 
                        thirdRow.appendChild(authorCell);
                        tblBody.appendChild(thirdRow); 

                        var fourthRow = document.createElement("tr");
                        var tagsCell = document.createElement("td");
                        var subtitleCell = document.createElement("td");

                        var subtitle_text = document.createElement("input");
                        var bktitle = document.createElement("input"); 
                        subtitle_text.id="J_subtitle";
                        subtitle_text.type = "text";  
                        subtitle_text.name = "subtitle";  
                        subtitle_text.value = rValue.subtitle;
                        subtitle_text.class="ordinary"; 
                        bktitle.type="button";
                        bktitle.value="标题";
                        subtitleCell.appendChild(bktitle);                        
                        subtitleCell.appendChild(subtitle_text); 

                        var tag_text = document.createElement("input");
                        var bktags = document.createElement("input"); 
                        tag_text.id="J_tags";
                        tag_text.type = "text";  
                        tag_text.name = "tags";  
                        tag_text.value = rValue.tags[0].title+","+rValue.tags[1].title+","+rValue.tags[2].title;
                        tag_text.class="ordinary";
                        bktags.type="button";
                        bktags.value="标签";
                        tagsCell.appendChild(bktags);                        
                        tagsCell.appendChild(tag_text) 

                        fourthRow.appendChild(subtitleCell); 
                        fourthRow.appendChild(tagsCell);
                        tblBody.appendChild(fourthRow); 

                        var fifthRow = document.createElement("tr");
                        var imgUrlCell = document.createElement("td");
                        var bindingCell = document.createElement("td");                                                

                        var img_text = document.createElement("input");
                        var bkimg = document.createElement("input");
                        img_text.id="J_img";
                        img_text.type = "text";  
                        img_text.name = "img";  
                        img_text.value = rValue.image; 
                        img_text.class="ordinary"; 
                        bkimg.type="button";
                        bkimg.value="图片";
                        imgUrlCell.appendChild(bkimg);                         
                        imgUrlCell.appendChild(img_text);
                        
                        var binding_text = document.createElement("input"); 
                        var bkbinding = document.createElement("input");
                        binding_text.id = "J_binding"    
                        binding_text.type = "text";  
                        binding_text.name = "binding";  
                        binding_text.value = rValue.binding; 
                        binding_text.class="ordinary"; 
                        bkbinding.type="button";
                        bkbinding.value="装订";
                        bindingCell.appendChild(bkbinding);                        
                        bindingCell.appendChild(binding_text);

                        fifthRow.appendChild(imgUrlCell); 
                        fifthRow.appendChild(bindingCell);
                        tblBody.appendChild(fifthRow); 

                        var sixthRow = document.createElement("tr");
                        var transCell = document.createElement("td");
                        var catagoryCell = document.createElement("td"); 

                        var trans_text = document.createElement("input");
                        var bktrans = document.createElement("input");
                        trans_text.id = "J_trans" 
                        trans_text.type = "text";  
                        trans_text.name = "translator";  
                        trans_text.value = rValue.translator;
                        trans_text.class="ordinary";
                        bktrans.type="button";
                        bktrans.value="翻译";
                        transCell.appendChild(bktrans);                          
                        transCell.appendChild(trans_text);

                        var catalog_text = document.createElement("input");
                        var bkcatalog = document.createElement("input");
                        catalog_text.id = "J_catalog";
                        catalog_text.type = "text";  
                        catalog_text.name = "catalog";  
                        catalog_text.value = rValue.catalog;
                        catalog_text.class="ordinary";
                        bkcatalog.type="button";
                        bkcatalog.value="目录";
                        catagoryCell.appendChild(bkcatalog);                        
                        catagoryCell.appendChild(catalog_text);

                        sixthRow.appendChild(transCell); 
                        sixthRow.appendChild(catagoryCell);
                        tblBody.appendChild(sixthRow); 

                        var seventhRow = document.createElement("tr");
                        var pageCell = document.createElement("td");
                        var publisherCell = document.createElement("td");                                                

                        var pages_text = document.createElement("input");
                        var bkpages = document.createElement("input");
                        pages_text.id = "J_pages"; 
                        pages_text.type = "text";  
                        pages_text.name = "pages";  
                        pages_text.value = rValue.pages; 
                        pages_text.class="ordinary";
                        bkpages.type="button";
                        bkpages.value="页数";
                        pageCell.appendChild(bkpages); 
                        pageCell.appendChild(pages_text);
                         
                        var publisher_text = document.createElement("input");
                        var bkpublisher = document.createElement("input");
                        publisher_text.id="J_publisher" 
                        publisher_text.type = "text";  
                        publisher_text.name = "publisher";  
                        publisher_text.value = rValue.publisher;
                        publisher_text.class="ordinary";
                        bkpublisher.type="button";
                        bkpublisher.value="出版社";
                        publisherCell.appendChild(bkpublisher);
                        publisherCell.appendChild(publisher_text);

                        seventhRow.appendChild(pageCell); 
                        seventhRow.appendChild(publisherCell);
                        tblBody.appendChild(seventhRow);

                        var eighthRow = document.createElement("tr");
                        var isbn10Cell = document.createElement("td");
                        var isbn13Cell = document.createElement("td");                                                  

                        var isbn10_text = document.createElement("input");
                        var bkisbn10 = document.createElement("input"); 
                        isbn10_text.id = "J_isbn10";
                        isbn10_text.type = "text";  
                        isbn10_text.name = "isbn10";  
                        isbn10_text.value = rValue.isbn10
                        isbn10_text.class="ordinary";
                        bkisbn10.type="button";
                        bkisbn10.value="isbn10";
                        isbn10Cell.appendChild(bkisbn10);
                        isbn10Cell.appendChild(isbn10_text);
                        
                        var isbn13_text = document.createElement("input");
                        var bkisbn13 = document.createElement("input");
                        isbn13_text.id = "J_isbn13"; 
                        isbn13_text.type = "text";  
                        isbn13_text.name = "isbn13";  
                        isbn13_text.value = rValue.isbn13;
                        isbn13_text.class="ordinary";
                        bkisbn13.type="button";
                        bkisbn13.value="isbn13";
                        isbn13Cell.appendChild(bkisbn13);  
                        isbn13Cell.appendChild(isbn13_text);

                        eighthRow.appendChild(isbn10Cell); 
                        eighthRow.appendChild(isbn13Cell);
                        tblBody.appendChild(eighthRow);

                        var ninethRow = document.createElement("tr");
                        var dourlCell = document.createElement("td");
                        var optionCell = document.createElement("td");                                                 

                        var douurl_text = document.createElement("input");
                        var bkdouurl = document.createElement("input");
                        douurl_text.id = "J_douurl";
                        douurl_text.type = "text";  
                        douurl_text.name = "durl";
                        douurl_text.value=rValue.url; 
                        bkdouurl.type="button";
                        bkdouurl.value="豆瓣url";
                        dourlCell.appendChild(bkdouurl); 
                        dourlCell.appendChild(douurl_text);

                        var option_text = document.createElement("input");
                        var bkoption = document.createElement("input");
                        option_text.id = "J_option" 
                        option_text.type = "checkbox";  
                        option_text.name = "option";  
                        option_text.class="check";
                        bkoption.type="button";
                        bkoption.value="是否私有";
                        optionCell.appendChild(bkoption);  
                        optionCell.appendChild(option_text); 

                        ninethRow.appendChild(dourlCell); 
                        ninethRow.appendChild(optionCell);
                        tblBody.appendChild(ninethRow);                                               


                        var summary_text = document.createElement("textarea");
                        var bksummary = document.createElement("input");
                        summary_text.id = "J_summary"; 
                        summary_text.cols = 30;  
                        summary_text.rows = 3;  
                        summary_text.class="review";
                        bksummary.type="button";
                        bksummary.value="书评";
                        bookform.appendChild(bksummary); 
                        summary_text.innerText=rValue.summary; 
                        bookform.appendChild(summary_text);

                        var submit_text = document.createElement("input");
                        submit_text.type = "button";  
                        submit_text.name = "submittion";  
                        submit_text.class="button";
                        submit_text.value="添加";
                        submit_text.onclick=function(){addBook()};
                        bookform.appendChild(submit_text);
                    },
                    error: function(e) {
                        alert("isbn does not exits");
                        document.getElementById("barcode").style.display="block";
                    }
                });
            }
