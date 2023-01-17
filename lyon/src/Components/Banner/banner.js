import './banner.css'
import { useEffect } from 'react';
const Banner = props => {
    // 1920x500px
    // let banners = [
    //     'url(https://cdn.sistemawbuy.com.br/arquivos/a3afc980c0b593ac7aedd97a241b1baa/slide/turbantes-brincos-moda-afro,2-081.png)',
    //     'url(https://www.megamodapark.com.br/wp-content/uploads/2021/10/BANNER-NATAL-2.png)',
    //     'url(https://www.megamodapark.com.br/wp-content/uploads/2022/01/994-BANNERS-DIGITAIS_INSTITUCIONAL-SALDAO_1920x500px.png)',
    //     'url(https://images.tcdn.com.br/img/editor/up/720558/bannerjana.png)',
    //     'url(https://images.tcdn.com.br/img/img_prod/748249/1669749169_1669632852_1657930391_banner-1---1920-x-50011.png)',
    //     'url(https://d2r9epyceweg5n.cloudfront.net/stores/001/416/282/themes/zen/slide-1640101140978-7773263207-5de4c331fe490ab160cdbd5aca5f20e81640101195.png?1860337305)'
    // ];

    // 1920x700px
    let banners = [
        'url(https://www.shoppinganaliafranco.com.br/sites/saf/files/banner-shoppingsconsumidor_0.png)',
        'url(https://cdn.shopify.com/s/files/1/1938/1617/files/canada-goose-shop-allbanner.jpg?v=1600381681)',
        'url(https://shoppingleblon.com.br/data/files/82/01/EB/B0/A60F3810D37A6D38180808FF/SL-LEBLONTAON-OMINICHAT-BANNER-DESKTOP-1920x700.png)'
    ]
    const divisors = [];
    const bannersElement = [];
    let actualBanner = 0;
    for(let i = 0; i < banners.length; i++) {
        divisors.push(<div onClick={() => {changeBanner(i)}} className={(i === 0 ? 'divisor selectedDivisorBanner' : 'divisor')} key={i}></div>);
        bannersElement.push(<div id={'banner'+i} className={(i === 0 ? 'banner selectedBanner' : 'banner')} key={i} style={{background: banners[i]}}></div>)
    }

    function changeBanner(bannerID = 0, bannerUpdate = true){
        document.getElementById('divisories').querySelector('.selectedDivisorBanner').classList.remove('selectedDivisorBanner')
        document.getElementById('banners').querySelector('.selectedBanner').classList.remove('selectedBanner');

        document.getElementById('divisories').querySelectorAll('.divisor')[bannerID].classList.add('selectedDivisorBanner')
        document.getElementById('banners').querySelectorAll('.banner')[bannerID].classList.add('selectedBanner');
        if (bannerUpdate) {
            clearInterval(changingBanner);
            actualBanner = bannerID;
            nextBannerInterval();
        }
    }
    let changingBanner;

    function nextBannerInterval(){
        changingBanner = setInterval(() => {
            actualBanner = actualBanner + 1 === banners.length ? 0 : actualBanner + 1;
            changeBanner(actualBanner, false)
        }, 5000);
    }

    useEffect(() => {
        if (banners.length > 1) nextBannerInterval();
        return () => {
            clearInterval(changingBanner);
        }
    });

    return <div id='banners'>
        <div id='sequencies'>
            {bannersElement}
        </div>
        <div id='divisories'>
            {divisors}
        </div>
    </div>
}

export default Banner