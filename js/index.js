
       document.addEventListener("DOMContentLoaded", () => {
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

        let current_category = null; //현재 열려 있는 카테고리 기억용

        buttons.forEach(i=>{
            i.addEventListener("click",()=>{
                const selected = i.dataset.filter; //이러면 변수를 설정하지 않아도 됨. html data
                /* 이미 열려 있고 같은 버튼을 누른경우 => 접기 */
                if($button_contents_area.classList.contains("hit") && current_category === selected){
                    $button_contents_area.classList.remove("hit");
                    buttons.forEach(btn=>{btn.classList.remove("act");
                    });
                    contents.forEach(c => {c.classList.remove("active")});
                    current_category = null; //상태 초기화
                    return;
                }


                //새로 열기
                $button_contents_area.classList.add("hit");
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
        const $product_btns = document.querySelectorAll(".product_subMenus button");
        const $product_contents = document.querySelectorAll("#product li"); /* css에서 display:none */
        const $product_area = document.querySelector("#product_area");
        
        let product_category = null; //현재 열려 있는 카테고리 기억용

        $product_btns.forEach(btn=>{
            btn.addEventListener("click",()=>{
                const p_selected = btn.dataset.sub;
                if($product_area.classList.contains("activing") && product_category === p_selected){
                    $product_area.classList.remove("activing");
                    $product_btns.forEach(button=>button.classList.remove("color"));
                    $product_contents.forEach(con=>con.classList.remove("act_d"));
                    product_category = null; //상태 초기화
                    return;
                }

                //새로 열기
                $product_area.classList.add("activing");
                $product_btns.forEach(bton=>bton.classList.remove("color"));
                btn.classList.add("color");
                $product_contents.forEach(co=>{
                    if(co.dataset.sub === p_selected){
                        co.classList.add("act_d")
                    }else{
                        co.classList.remove("act_d");
                    }
                });
                product_category = p_selected;
            });
        });

      









        }); //js end