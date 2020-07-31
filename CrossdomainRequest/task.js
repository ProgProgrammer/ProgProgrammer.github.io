(function()
{
    function sendPHP(text)
    {
        const text2 = document.querySelector(".text");
        const textQuestion = text;
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://51.158.77.145/cross_domain_queries/form.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = () => 
        { 
            if (xhr.readyState === 4 && xhr.status === 200) 
            { 
                text2.innerHTML += (`</br> <span style="border-bottom: 1px solid black;"> ${textQuestion} </span> </br> ${xhr.responseText} </br>`); 
            }
        }
        xhr.send("form_input=" + textQuestion);
    }

    window.addEventListener('DOMContentLoaded', () =>
    {
        setTimeout(() => sendPHP("Как дела, Сергей?"), 1000);  
        setTimeout(() => sendPHP("Как дела, Вован?"), 2000);  
        setTimeout(() => sendPHP("Как дела?"), 3000);            
    });
})

()