document.addEventListener('DOMContentLoaded', () => {
    const webApp = window.Telegram && window.Telegram.WebApp;

    // Elementlarni olish
    const closeAppBtn = document.getElementById('close-app-btn');
    const userIonBalance = document.getElementById('user-ion-balance');
    const profileIonBalance = document.getElementById('profile-ion-balance');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const nftMarketGrid = document.getElementById('nft-market-grid');
    const myNftsList = document.getElementById('my-nfts-list');
    
    // Pul kiritish/yechish tugmalari
    const depositIonBtn = document.getElementById('deposit-ion-btn');
    const withdrawIonBtn = document.getElementById('withdraw-ion-btn');
    const depositModal = document.getElementById('deposit-modal');
    const paymentReceiptModal = document.getElementById('payment-receipt-modal');
    const withdrawModal = document.getElementById('withdraw-modal');
    const cardInputModal = document.getElementById('card-input-modal');
    const ionExchangeRate = document.getElementById('ion-exchange-rate');
    const ionWithdrawalRate = document.getElementById('ion-withdrawal-rate');
    const availableIonForWithdrawal = document.getElementById('available-ion-for-withdrawal');
    const confirmPaymentBtn = document.getElementById('confirm-payment-btn');
    const receiptInput = document.getElementById('receipt-input');
    const sendReceiptBtn = document.getElementById('send-receipt-btn');
    const withdrawAmountInput = document.getElementById('withdraw-amount-input');
    const requestWithdrawalBtn = document.getElementById('request-withdrawal-btn');
    const cardNumberInput = document.getElementById('card-number-input');
    const sendCardBtn = document.getElementById('send-card-btn');

    // NFT e'lon qo'shish
    const addNftAdBtn = document.getElementById('add-nft-ad-btn');
    const addAdModal = document.getElementById('add-ad-modal');
    const sentNftToAdminBtn = document.getElementById('sent-nft-to-admin-btn');
    const setNftPriceModal = document.getElementById('set-nft-price-modal');
    const nftNameForPrice = document.getElementById('nft-name-for-price');
    const nftPriceInput = document.getElementById('nft-price-input');
    const confirmNftPriceBtn = document.getElementById('confirm-nft-price-btn');

    // Mening NFTlarim / Harakatlar
    const myNftActionsModal = document.getElementById('my-nft-actions-modal');
    const myNftActionTitle = document.getElementById('my-nft-action-title');
    const myNftActionDescription = document.getElementById('my-nft-action-description');
    const relistNftBtn = document.getElementById('relist-nft-btn');
    const cancelAdBtn = document.getElementById('cancel-ad-btn');
    const retrieveNftBtn = document.getElementById('retrieve-nft-btn');
    const selectRetrieveNftModal = document.getElementById('select-retrieve-nft-modal');
    const retrievableNftList = document.getElementById('retrievable-nft-list');

    // Auktsion
    const auctionBtn = document.getElementById('auction-btn');
    const auctionSelectionModal = document.getElementById('auction-selection-modal');
    const auctionableNftList = document.getElementById('auctionable-nft-list');

    // Modal yopish tugmalari
    const closeButtons = document.querySelectorAll('.modal .close-button');


    // ----------- Global o'zgaruvchilar (Frontendda simulyatsiya uchun) -----------
    let currentUserBalance = 0.00; // Foydalanuvchi ION balansi
    const ION_EXCHANGE_RATE_BUY = 52000; // 1 ION = 52 000 UZS
    const ION_EXCHANGE_RATE_SELL = 50000; // 1 ION = 50 000 UZS

    // Soxta NFT ma'lumotlari (backenddan keladigandek tasavvur qiling)
    // Haqiqiy NFT linklari o'rniga placeholderlar ishlatilgan
    let marketNfts = [
        { id: 'm1', name: "B-Day Candle", image: "https://via.placeholder.com/250x250/50b86a/FFFFFF?text=B-Day+Candle", price: "1.23", isListed: true },
        { id: 'm2', name: "B-Day Candle", image: "https://via.placeholder.com/250x250/8a4bc7/FFFFFF?text=B-Day+Candle", price: "1.23", isListed: true },
        { id: 'm3', name: "Happy B-Day", image: "https://via.placeholder.com/250x250/f07300/FFFFFF?text=Happy+B-Day", price: "1.23", isListed: true },
        { id: 'm4', name: "Happy B-Day", image: "https://via.placeholder.com/250x250/f07300/FFFFFF?text=Happy+B-Day", price: "1.23", isListed: true },
        { id: 'm5', name: "Xmas Stocking", image: "https://via.placeholder.com/250x250/4CAF50/FFFFFF?text=Xmas+Stocking", price: "1.39", isListed: true },
        { id: 'm6', name: "Snake Box", image: "https://via.placeholder.com/250x250/FF5733/FFFFFF?text=Snake+Box", price: "1.45", isListed: true },
        { id: 'm7', name: "Snoop Dogg", image: "https://via.placeholder.com/250x250/6A5ACD/FFFFFF?text=Snoop+Dogg", price: "1.84", isListed: true },
        { id: 'm8', name: "Party Sparkler", image: "https://via.placeholder.com/250x250/FFD700/FFFFFF?text=Party+Sparkler", price: "2.49", isListed: true },
        { id: 'm9', name: "Genie Lamp", image: "https://via.placeholder.com/250x250/48D1CC/FFFFFF?text=Genie+Lamp", price: "55", isListed: true },
        { id: 'm10', name: "Genie Lamp", image: "https://via.placeholder.com/250x250/48D1CC/FFFFFF?text=Genie+Lamp", price: "55", isListed: true },
    ];

    let myNfts = [
        { id: 'my1', name: "Santa Hat", image: "https://via.placeholder.com/250x250/E91E63/FFFFFF?text=Santa+Hat", isListed: false, price: null },
        { id: 'my2', name: "Witch Hat", image: "https://via.placeholder.com/250x250/9C27B0/FFFFFF?text=Witch+Hat", isListed: true, price: 1.5 },
        { id: 'my3', name: "Pumpkin Decor", image: "https://via.placeholder.com/250x250/FF9800/FFFFFF?text=Pumpkin+Decor", isListed: false, price: null },
    ];

    let selectedNftForAction = null; // Qaysi NFT ustida harakat bajarilayotganini saqlaydi

    // ----------- Funksiyalar -----------

    // Umumiy balansni yangilash
    function updateBalanceDisplay() {
        userIonBalance.innerText = currentUserBalance.toFixed(2);
        profileIonBalance.innerText = currentUserBalance.toFixed(2) + ' ION';
        availableIonForWithdrawal.innerText = currentUserBalance.toFixed(2);
    }

    // NFTlarni gridga joylashtirish
    function renderNfts(container, nftsArray, isMyNfts = false) {
        container.innerHTML = ''; // Kontentni tozalash
        nftsArray.forEach(nft => {
            const nftItem = document.createElement('div');
            nftItem.classList.add('nft-item');
            
            let priceDisplay = nft.price ? `<span class="price">💎 ${nft.price}</span>` : `<span class="price"></span>`;
            
            if (isMyNfts) {
                // Mening NFTlarim uchun qo'shimcha ma'lumot
                priceDisplay = nft.isListed ? `<span class="price">Sotuvda: 💎 ${nft.price}</span>` : `<span class="price"></span>`;
                nftItem.innerHTML = `
                    <img src="${nft.image}" alt="${nft.name}">
                    <h3>${nft.name}</h3>
                    <p class="nft-id">#${nft.id}</p>
                    <p>${nft.isListed ? 'Eʼlonda' : 'Profilimda'}</p>
                    <p class="price">${nft.isListed ? `💎 ${nft.price}` : 'Sotuvda emas'}</p>
                `;
                nftItem.addEventListener('click', () => showMyNftActionsModal(nft));
            } else {
                 nftItem.innerHTML = `
                    <img src="${nft.image}" alt="${nft.name}">
                    <h3>${nft.name}</h3>
                    <p class="nft-id">#${nft.id}</p>
                    <div class="price-and-cart">
                        <span class="price">💎 ${nft.price}</span>
                        <button class="cart-icon-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </button>
                    </div>
                `;
                nftItem.querySelector('.cart-icon-btn').addEventListener('click', (e) => {
                    e.stopPropagation(); // Kartani bosmasdan tugmani bosish
                    webApp.showAlert(`"${nft.name}" NFTni savatga qo'shish (ID: ${nft.id})`);
                    // Backendga savatga qo'shish so'rovi yuborish kerak
                });
            }
           
            container.appendChild(nftItem);
        });
    }

    // Modalni ochish/yopish
    function openModal(modal) {
        modal.style.display = 'flex';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Tab va navigatsiya tugmalarini boshqarish
    function switchTab(tabId) {
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');

        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');

        navButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.nav-btn[data-tab-target="${tabId}"]`).classList.add('active');

        // Har safar tab o'zgarganda ma'lumotlarni yangilash
        if (tabId === 'market') {
            renderNfts(nftMarketGrid, marketNfts, false);
        } else if (tabId === 'my-gifts') {
            renderNfts(myNftsList, myNfts, true);
        } else if (tabId === 'profile-section') {
            updateBalanceDisplay();
        }
    }

    // ----------- Hodisa tinglovchilar (Event Listeners) -----------

    // TWA tayyor bo'lganda
    if (webApp) {
        webApp.ready();
        webApp.expand();

        // Foydalanuvchi ma'lumotlarini yuklash
        if (webApp.initDataUnsafe && webApp.initDataUnsafe.user) {
            const user = webApp.initDataUnsafe.user;
            // Foydalanuvchi IDsi orqali balansni backenddan olish kerak
            // Hozircha statik balans
            currentUserBalance = 0.00; // Foydalanuvchining boshlang'ich balansi
            webApp.showAlert(`Salom, ${user.first_name || 'aziz foydalanuvchi'}!`);
        } else {
            webApp.showAlert("Iltimos, ilovani Telegram ichidan oching.");
        }

        closeAppBtn.addEventListener('click', () => {
            webApp.close();
        });

        // Test uchun botga xabar yuborish
        // webApp.sendData("app_started");
    } else {
        // Brauzerda test uchun ogohlantirish
        alert("Bu ilova Telegram Web App muhitida yaxshiroq ishlaydi. Ba'zi funksiyalar cheklangan bo'lishi mumkin.");
        closeAppBtn.style.display = 'none'; // Close tugmasini yashirish

        // Brauzerda test uchun soxta TWA obyekti
        window.Telegram = {
            WebApp: {
                showAlert: (msg) => alert(msg),
                showConfirm: (msg, callback) => callback(confirm(msg)),
                showNotification: (params) => alert(`Notification: ${params.message} (${params.type})`),
                close: () => console.log("Web App closed (browser simulation)"),
                ready: () => console.log("Web App ready (browser simulation)"),
                expand: () => console.log("Web App expanded (browser simulation)"),
                initDataUnsafe: { user: { id: 12345, first_name: "TestUser", username: "test_user" } }
            }
        };
        // Endi webApp o'zgaruvchisini qayta olish
        webApp = window.Telegram.WebApp;
        webApp.ready();
        webApp.expand();
        if (webApp.initDataUnsafe && webApp.initDataUnsafe.user) {
            console.log(`Foydalanuvchi: ${webApp.initDataUnsafe.user.first_name} (ID: ${webApp.initDataUnsafe.user.id})`);
        }
    }

    // Tablar va Pastki Navigatsiya
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            switchTab(tabId);
        });
    });

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tabTarget;
            switchTab(tabId);
        });
    });

    // Dastlabki yuklanishda Market tabini ko'rsatish
    switchTab('market');
    
    // Pul kiritish
    depositIonBtn.addEventListener('click', () => {
        ionExchangeRate.innerText = ION_EXCHANGE_RATE_BUY.toLocaleString('uz-UZ');
        openModal(depositModal);
    });

    confirmPaymentBtn.addEventListener('click', () => {
        closeModal(depositModal);
        openModal(paymentReceiptModal);
    });

    sendReceiptBtn.addEventListener('click', () => {
        const receiptId = receiptInput.value.trim();
        if (receiptId) {
            webApp.showConfirm(`ID: ${webApp.initDataUnsafe.user.id} foydalanuvchidan chek qabul qilindi. Chek ID: ${receiptId}.`, (confirmed) => {
                if (confirmed) {
                    // Backendga chekni yuborish
                    // Misol: Telegram botga `admin_deposit_request:USER_ID:RECEIPT_ID` xabarini yuborish
                    webApp.sendData(JSON.stringify({
                        type: 'deposit_request',
                        user_id: webApp.initDataUnsafe.user.id,
                        receipt_id: receiptId
                    }));
                    webApp.showAlert("To'lov cheki adminga yuborildi. Balansingiz tez orada to'ldiriladi!");
                    closeModal(paymentReceiptModal);
                    receiptInput.value = ''; // Inputni tozalash
                }
            });
        } else {
            webApp.showAlert("Iltimos, chek ID'sini kiriting.");
        }
    });

    // Pul yechish
    withdrawIonBtn.addEventListener('click', () => {
        ionWithdrawalRate.innerText = ION_EXCHANGE_RATE_SELL.toLocaleString('uz-UZ');
        availableIonForWithdrawal.innerText = currentUserBalance.toFixed(2);
        openModal(withdrawModal);
    });

    requestWithdrawalBtn.addEventListener('click', () => {
        const amount = parseFloat(withdrawAmountInput.value);
        if (isNaN(amount) || amount <= 0 || amount > currentUserBalance) {
            webApp.showAlert("Noto'g'ri miqdor kiritdingiz yoki balansingiz yetarli emas.");
            return;
        }

        webApp.showConfirm(`Siz ${amount} ION yechib olmoqchisiz. Bu ${amount * ION_EXCHANGE_RATE_SELL} UZS bo'ladi. Davom etasizmi?`, (confirmed) => {
            if (confirmed) {
                closeModal(withdrawModal);
                // Karta raqamini so'rash modalini ochish
                openModal(cardInputModal);
                // Bu yerda frontendda balansni kamaytiramiz (backend tasdiqlaguncha kutmasdan)
                // Haqiqiy loyihada backend tasdiqlashini kutish kerak
                // currentUserBalance -= amount;
                // updateBalanceDisplay();
            }
        });
    });

    sendCardBtn.addEventListener('click', () => {
        const cardNumber = cardNumberInput.value.trim();
        if (!/^\d{16}$/.test(cardNumber)) { // 16 raqamli tekshiruv
            webApp.showAlert("Iltimos, 16 xonali karta raqamini to'g'ri kiriting.");
            return;
        }
        
        webApp.showConfirm(`Karta raqami: ${cardNumber}. Yechish so'rovini yuborasizmi?`, (confirmed) => {
            if (confirmed) {
                // Backendga yechish so'rovini yuborish
                webApp.sendData(JSON.stringify({
                    type: 'withdrawal_request',
                    user_id: webApp.initDataUnsafe.user.id,
                    ion_amount: parseFloat(withdrawAmountInput.value),
                    card_number: cardNumber
                }));
                webApp.showAlert("Yechish so'rovingiz adminga yuborildi. Tez orada pulingiz kartangizga o'tkaziladi.");
                closeModal(cardInputModal);
                cardNumberInput.value = ''; // Inputni tozalash
                withdrawAmountInput.value = ''; // Inputni tozalash

                // Backend tasdiqlaganidan keyin balansni kamaytiramiz
                currentUserBalance -= parseFloat(withdrawAmountInput.value); // Bu yerda backenddan javob kelganidan keyin qilish kerak
                updateBalanceDisplay();
            }
        });
    });

    // Modalni yopish tugmalari
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    // E'lon qo'shish
    addNftAdBtn.addEventListener('click', () => {
        openModal(addAdModal);
    });

    sentNftToAdminBtn.addEventListener('click', () => {
        webApp.showAlert("NFTni adminga yuborganingizni tasdiqladingiz. Admin javobini kuting.");
        closeModal(addAdModal);

        // Bu yerda botga xabar yuboriladi, masalan:
        webApp.sendData(JSON.stringify({
            type: 'nft_ad_sent_to_admin',
            user_id: webApp.initDataUnsafe.user.id
        }));

        // Admin tomonidan "NFT narxini kiriting" buyrug'i kelganini simulyatsiya qilamiz.
        // Haqiqiy loyihada bu botdan keladigan xabar orqali ishlaydi.
        setTimeout(() => {
            // Misol uchun, admin "Witch Hat" NFT'sini qayta narxlashni so'radi.
            const nftToPrice = myNfts.find(nft => nft.id === 'my2'); // Example: "Witch Hat"
            if (nftToPrice) {
                selectedNftForAction = nftToPrice;
                nftNameForPrice.innerText = `"${nftToPrice.name}" uchun narx kiriting:`;
                openModal(setNftPriceModal);
            } else {
                webApp.showAlert("Admin siz yuborgan NFTni topmadi yoki boshqa holat yuz berdi.");
            }
        }, 3000); // 3 soniyadan keyin simulyatsiya
    });

    confirmNftPriceBtn.addEventListener('click', () => {
        const price = parseFloat(nftPriceInput.value);
        if (isNaN(price) || price <= 0) {
            webApp.showAlert("Iltimos, to'g'ri narx kiriting.");
            return;
        }

        if (selectedNftForAction) {
            webApp.showConfirm(`"${selectedNftForAction.name}" NFT uchun ${price} ION narx belgilaysizmi?`, (confirmed) => {
                if (confirmed) {
                    // NFTni sotuvga qo'yishni backendga yuborish
                    // Bu yerda simulyatsiya:
                    const nftIndex = myNfts.findIndex(nft => nft.id === selectedNftForAction.id);
                    if (nftIndex !== -1) {
                        myNfts[nftIndex].isListed = true;
                        myNfts[nftIndex].price = price;
                        // Frontendda ham marketga qo'shish
                        // Agar marketNftsda yo'q bo'lsa qo'shamiz
                        if (!marketNfts.some(n => n.id === selectedNftForAction.id)) {
                            marketNfts.push({ ...myNfts[nftIndex] });
                        } else {
                             const marketNftIndex = marketNfts.findIndex(n => n.id === selectedNftForAction.id);
                             marketNfts[marketNftIndex].price = price; // Narxini yangilash
                             marketNfts[marketNftIndex].isListed = true;
                        }
                    }
                    renderNfts(myNftsList, myNfts, true); // Mening NFTlarimni yangilash
                    renderNfts(nftMarketGrid, marketNfts, false); // Marketni yangilash
                    webApp.showAlert(`"${selectedNftForAction.name}" NFT ${price} IONga sotuvga qo'yildi!`);
                    closeModal(setNftPriceModal);
                    nftPriceInput.value = '';
                    selectedNftForAction = null;
                }
            });
        }
    });

    // Mening NFTlarimdan harakatlar
    function showMyNftActionsModal(nft) {
        selectedNftForAction = nft;
        myNftActionTitle.innerText = `${nft.name} (#${nft.id})`;
        myNftActionDescription.innerText = nft.isListed ? "Bu NFT hozirda sotuvda." : "Bu NFT sotuvda emas.";
        
        // Tugmalarni holatiga qarab ko'rsatish
        if (nft.isListed) {
            relistNftBtn.style.display = 'none';
            cancelAdBtn.style.display = 'block';
            retrieveNftBtn.style.display = 'block';
        } else {
            relistNftBtn.style.display = 'block';
            cancelAdBtn.style.display = 'none';
            retrieveNftBtn.style.display = 'block';
        }

        openModal(myNftActionsModal);
    }

    relistNftBtn.addEventListener('click', () => {
        if (selectedNftForAction) {
            closeModal(myNftActionsModal);
            nftNameForPrice.innerText = `"${selectedNftForAction.name}" uchun yangi narx kiriting:`;
            nftPriceInput.value = selectedNftForAction.price || '';
            openModal(setNftPriceModal);
        }
    });

    cancelAdBtn.addEventListener('click', () => {
        if (selectedNftForAction) {
            webApp.showConfirm(`"${selectedNftForAction.name}" e'lonini bekor qilasizmi? NFT sotuvdan olinadi.`, (confirmed) => {
                if (confirmed) {
                    const nftIndex = myNfts.findIndex(nft => nft.id === selectedNftForAction.id);
                    if (nftIndex !== -1) {
                        myNfts[nftIndex].isListed = false;
                        // Marketdan olib tashlash
                        marketNfts = marketNfts.filter(nft => nft.id !== selectedNftForAction.id);
                    }
                    renderNfts(myNftsList, myNfts, true);
                    renderNfts(nftMarketGrid, marketNfts, false);
                    webApp.showAlert(`"${selectedNftForAction.name}" e'loni bekor qilindi.`);
                    closeModal(myNftActionsModal);
                    selectedNftForAction = null;
                }
            });
        }
    });

    retrieveNftBtn.addEventListener('click', () => {
        closeModal(myNftActionsModal);
        // Faqat sotuvda bo'lmagan NFTlarni chiqarib olishga ruxsat beramiz
        const unlistedNfts = myNfts.filter(nft => !nft.isListed);
        if (unlistedNfts.length === 0) {
            webApp.showAlert("Chiqarib olish uchun sotuvda bo'lmagan NFTingiz yo'q.");
            return;
        }

        retrievableNftList.innerHTML = '';
        unlistedNfts.forEach((nft, index) => {
            const listItem = document.createElement('li');
            listItem.innerText = `${index + 1}- ${nft.name} (#${nft.id})`;
            listItem.addEventListener('click', () => {
                webApp.showConfirm(`"${nft.name}" NFTni chiqarib olishni tasdiqlaysizmi? Buning uchun stars to'lash (yoki ION yechish) talab qilinishi mumkin.`, (confirmed) => {
                    if (confirmed) {
                        webApp.sendData(JSON.stringify({
                            type: 'nft_retrieve_request',
                            user_id: webApp.initDataUnsafe.user.id,
                            nft_id: nft.id
                        }));
                        webApp.showAlert(`"${nft.name}" NFTni chiqarib olish so'rovi adminga yuborildi. Admin bilan bog'laning: @TgMenejer`);
                        closeModal(selectRetrieveNftModal);
                    }
                });
            });
            retrievableNftList.appendChild(listItem);
        });
        openModal(selectRetrieveNftModal);
    });


    // Auktsion
    auctionBtn.addEventListener('click', () => {
        // Faqat sotuvda bo'lmagan NFTlarni auktsionga qo'yishga ruxsat beramiz
        const unlistedNfts = myNfts.filter(nft => !nft.isListed);
        if (unlistedNfts.length === 0) {
            webApp.showAlert("Auktsionga qo'yish uchun sotuvda bo'lmagan NFTingiz yo'q.");
            return;
        }

        auctionableNftList.innerHTML = '';
        unlistedNfts.forEach((nft, index) => {
            const listItem = document.createElement('li');
            listItem.innerText = `${index + 1}- ${nft.name} (#${nft.id})`;
            listItem.addEventListener('click', () => {
                webApp.showConfirm(`"${nft.name}" NFTni auktsionga qo'yishni tasdiqlaysizmi? (24 soatga, eng ko'p taklif bergan g'olib bo'ladi) `, (confirmed) => {
                    if (confirmed) {
                         // NFTni auktsionga qo'yish so'rovini backendga yuborish
                        webApp.sendData(JSON.stringify({
                            type: 'auction_start_request',
                            user_id: webApp.initDataUnsafe.user.id,
                            nft_id: nft.id,
                            nft_name: nft.name,
                            duration_hours: 24 // Statik 24 soat
                        }));
                        webApp.showAlert(`"${nft.name}" NFT auktsionga qo'yildi! Admin tomonidan tasdiqlanishini kuting.`);
                        closeModal(auctionSelectionModal);
                    }
                });
            });
            auctionableNftList.appendChild(listItem);
        });
        openModal(auctionSelectionModal);
    });

    // Balansni boshida yangilash
    updateBalanceDisplay();
});
