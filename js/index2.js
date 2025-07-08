
document.addEventListener("DOMContentLoaded", () => {
        
    /*메인화면 직육면체 js*/
    /* 마우스 인터렉션 */

        const $cube = document.querySelector("#cube");
        const $best_img = document.querySelector("#best_img");

        let drag = false;
        let previousX = 0;
        let currentX = 0;

        //다중이벤트 처리하기 => 마우스/터치 함수호출()
        const start_drag = (e)=>{
            drag = true; /* 드래그가 진행중이니까 */
            if(e.type === "touchstart"){
                previousX = e.touches[0].clientX; /* client ==> 좌표 값 계산 => 얼마나 떨어졌는지 */
            }else{
                previousX = e.clientX;
            }
            $best_img.style.cursor = "grabbing";
        };

        //드래그 끝남
        const end_drag =()=>{
            drag = false;  /* 드래그가 끝남 */
            $best_img.style.cursor = "grab";
        };

        //드래그 중 이동처리
        const hands_move = (e)=>{
            if(!drag) return;

            let currnetXpos;
            if(e.type === "touchmove"){
                currnetXpos = e.touches[0].clientX;
            }else{
                currnetXpos = e.clientX;
            }

            const deltaX = currnetXpos - previousX;
            previousX = currnetXpos;

            const move_x = Math.min(Math.max(deltaX, -50),50);
            currentX += move_x * 0.5;
            $cube.style.transform = `rotateY(${currentX}deg)`;
        }

        
        $best_img.addEventListener("mousedown", start_drag);
        window.addEventListener("mouseup", end_drag);
        window.addEventListener("mousemove", hands_move);

        $best_img.addEventListener("touchstart", start_drag);
        window.addEventListener("touchend", end_drag);
        window.addEventListener("touchmove", hands_move);

        /* 회전하라는 글자 표시 */
       
            const rotate_text = document.querySelector("#rotate_me");
             function rotate_move (e){
                    const x = e.pageX + 20;
                    const y = e.pageY + 20;
                    rotate_text.style.left = `${x}px`;
                    rotate_text.style.top = `${y}px`;
                }
                //조건 적용 함수
                const desktop_rotate =()=>{
                    if(window.innerWidth >= 1280){
                        rotate_text.classList.add("block");
                        $best_img.addEventListener("mousemove",rotate_move);
                    }else{
                        rotate_text.classList.remove("block");
                        $best_img.removeEventListener("mousemove",rotate_move);
                            
                    }
                }
                

                window.addEventListener("load",desktop_rotate);
                window.addEventListener("resize",desktop_rotate);
                   
        


        /* 다음 페이지를 누르면 다른 제품이 보인다. ==>4장이 한꺼번에 바뀐다. */

        const arrow_btn = document.querySelectorAll("#arrow button"); //nodelist
        const wrap_img = document.querySelectorAll(".img_wrap img");
        
        /* 그동안 한 교체랑 달리 배열로 접근하기 ==> 객체화로 하기에는 키가 명확하지 않아서 */
        const change_img =[
            ["image/red_d.jpg" , "image/hands.jpg" , "image/hands.jpg", "image/black2.jpg"],
            ["image/green2.jpg" , "image/gray_2.jpg" , "image/gray_3.jpg", "image/green2.jpg"],
             ["image/red_d.jpg" , "image/hands.jpg" , "image/gray_3.jpg", "image/black2.jpg"],
            ["image/hands.jpg" , "image/green2.jpg" , "image/hands.jpg", "image/red_d.jpg"]
        ];

        let current_index =0;

        arrow_btn.forEach(btn=>{
            btn.addEventListener("click",()=>{
                if(btn.textContent.includes("arrow_left")){
                    current_index = (current_index -1 + change_img.length) % change_img.length;
                }else{
                    current_index = (current_index +1) % change_img.length;
                }

                //이미지 교체
                wrap_img.forEach((img,idx)=>{
                    img.src = change_img[current_index][idx];
                });
            });
        });

 
  // 첫 번째 타자 효과
        const type_contents_1 = document.querySelectorAll("#typing strong b")[0];
        const contents1_text = "세상의 모든 운동선수에게 영감과 혁신을 전달한다.";
        let i =0;

        const typing_1 = ()=>{

            if(i < contents1_text.length){
                type_contents_1.append(contents1_text[i++]);
            }else{
                clearInterval(timer_1);
                setTimeout(htmlElement_typing,500);
            }
        };
        const timer_1 = setInterval(typing_1,200);

        //두번째 타자 효과
        const type_contents_2 = document.querySelector(".second_b");
        const htmlString = "당신이 몸을 가지고 있다면,<span>당신은 운동선수이다.</span>"
        
        const $b = document.createElement("b");
        $b.innerHTML = htmlString;
        const nodes = Array.from($b.childNodes); //텍스트, span 요소 분리

        function htmlElement_typing(){
            type_contents_2.classList.add("active");
            let j =0;
            const typeNode = ()=>{
                if(j >= nodes.length) return;
                const node = nodes[j++];

                if(node.nodeType === node.TEXT_NODE){
                    let text = node.textContent;
                    let k = 0;

                    const textTimer = setInterval(()=>{
                        if(k<text.length){
                            type_contents_2.append(text[k++]);
                        }else{
                            clearInterval(textTimer);
                            typeNode(); //다음 노드 실행
                        }
                    },100)
                }else{
                    type_contents_2.append(node);
                    typeNode();
                }
            };
            typeNode();
        }

        /* 버튼 눌렀을 때 해당 요소가 보인다. */
        const buttons = document.querySelectorAll(".tab_nav button");
        const contents = document.querySelectorAll(".button_contents li");
        const $button_contents_area = document.querySelector(".button_contents_area");
        const $best_product = document.querySelector("#best_product");
        const $arrow = document.querySelector("#arrow");
        let current_category = null; //현재 열려 있는 카테고리 기억용

        buttons.forEach(i=>{
            i.addEventListener("click",()=>{
                const selected = i.dataset.filter; //이러면 변수를 설정하지 않아도 됨. html data
                /* 이미 열려 있고 같은 버튼을 누른경우 => 접기 */
                if($button_contents_area.classList.contains("hit") && current_category === selected){
                    $button_contents_area.classList.remove("hit");
                    $best_product.classList.remove("hide");
                    $arrow.classList.remove("a_hide");
                    rotate_text.classList.add("block");
                    buttons.forEach(btn=>{btn.classList.remove("act");
                    });
                    contents.forEach(c => {c.classList.remove("active")});
                    current_category = null; //상태 초기화
                    return;
                }


                //새로 열기
                $button_contents_area.classList.add("hit");
                $best_product.classList.add("hide");
                rotate_text.classList.remove("block");
                $arrow.classList.add("a_hide");
                buttons.forEach(btn=>btn.classList.remove("act"));
                i.classList.add("act");
                contents.forEach(c=>{
                    if(c.dataset.category === selected){
                        c.classList.add("active");
                    }else{
                        c.classList.remove("active");
                    }
                });
                current_category = selected;

       
            });
        });

        //초기에는 브랜드만 보이게
        contents.forEach((k)=>{
            if(k.dataset.category === "brand"){
                k.classList.add("active");
            }else{
               k.classList.remove("active");
            }
        }); 

        /* 제품 컨텐츠 내용이 보인다. */
        const button_div = document.querySelector(".product_subMenus"); /* 버튼을 감싸고 있는 div 영역 */
        const $product_area = document.querySelector("#product_area"); /*버튼의 컨텐츠 내용을 감싸고 있는 ul*/
        //카테고리의 현재 상태를 객체로 넣음
        const product_category ={
            p_ca : null,
        }
        const all_btn = document.querySelectorAll(".product_subMenus button");
       
        button_div.addEventListener("click",e=>{
           if(![...all_btn].includes(e.target)) return;

           const selected_product = e.target.dataset.sub; // 각 버튼마다 forEach 문을 안돌렸기 때문에, e.taret으로 접근함
            const all_contets = document.querySelectorAll("#product li");
            const same_category = product_category.p_ca === selected_product;
        
            //닫기 버튼
            if($product_area.classList.contains("activing") && same_category){
                $product_area.classList.remove("activing");
                all_btn.forEach(btn=>btn.classList.remove("color"));
                all_contets.forEach(all=>all.classList.remove("act_d"));
                product_category.p_ca = null;
               
            }else{
                //열기
                 $product_area.classList.add("activing");
                all_btn.forEach(btn=>btn.classList.remove("color"));
                e.target.classList.add("color");

                all_contets.forEach(bt=>bt.classList.toggle("act_d" , bt.dataset.sub === selected_product));
            };
            product_category.p_ca = selected_product;
        
        });
        
            /* 제품 항복의 서브 메뉴 글자를 스치면 해당 제품이 보인다. */
            /* 신발 */
            const subMenu_link_s = document.querySelectorAll(".shoes_subMenu a"); //nodelist
            const $click = document.querySelector("#move_img");
            const click_img = document.querySelector("#move_img img");

            function moveImage (e){
                    const x = e.pageX + 20;
                    const y = e.pageY + 20;
                    $click.style.left = `${x}px`;
                    $click.style.top = `${y}px`;
                }

            subMenu_link_s.forEach((link,index)=>{
                link.addEventListener("mouseenter",()=>{
                    click_img.src = `image/product_img/shoes_${index+1}.jpg`;
                    $click.style.display = "block";
                });
                link.addEventListener("mouseleave",()=>{
                    $click.style.display = "none";
                });
                link.addEventListener("mousemove",moveImage); //마우스 이벤트는 한번만 등록해도 됨
              
            });

            /* 옷 */
            const subMenu_link_c = document.querySelectorAll(".clothes_subMenu a"); //nodelist
            const $click_c = document.querySelector("#move_img_c");
            const click_img_c = document.querySelector("#move_img_c img");
              function moveImage_c (e){
                    const x = e.pageX + 20;
                    const y = e.pageY + 20;
                    $click_c.style.left = `${x}px`;
                    $click_c.style.top = `${y}px`;
                }
        
            subMenu_link_c.forEach((link,index)=>{
                link.addEventListener("mouseenter",()=>{
                    click_img_c.src = `image/product_clothes/clothes_${index+1}.jpg`;
                    $click_c.style.display = "block";
                });
                link.addEventListener("mouseleave",()=>{
                    $click_c.style.display = "none";
                });
                link.addEventListener("mousemove",moveImage_c); //마우스 이벤트는 한번만 등록해도 됨
              
            });


            /*컬렉션 마우스 텍스트 바뀜*/
            const follow_text = document.querySelector("#follow_text");
            const collection_Area = document.querySelector(".collection_Area");
            /* 사진 영역에서 움직일 마우스 범위 지정 */
            const move_text = j=>{
                const mouse_bounce = collection_Area.getBoundingClientRect(); /* getBoundingClientRect() 메서드 사용 */
                const move_x = j.clientX - mouse_bounce.left + 10;
                const move_y = j.clientY - mouse_bounce.top + 10;
                follow_text.style.transform = `translate(${move_x}px ,${move_y}px )`

            }
            /* 변수를 객체화 해서 넣음 ==> 해당 텍스트가 바뀔 것임*/
              const text_contents = {
                img_1 : "nike_1",
                img_2 : "nike_2",
                img_3 : "nike_3",
                img_4 : "nike_4"
            };
            
            console.log(follow_text);
            const $img_box = document.querySelectorAll(".img-box img");
            $img_box.forEach((img)=>{
                img.addEventListener("mouseover",()=>{
                    const key = img.alt; //img_1 , img_2...
                    follow_text.textContent  = text_contents[key];
                    follow_text.style.opacity  = "1";
                  img.addEventListener("mousemove",move_text);    
                });
                img.addEventListener("mouseleave",()=>{
                    follow_text.style.opacity  = "0";
                })
            }  
        )

       

        }); //js end
