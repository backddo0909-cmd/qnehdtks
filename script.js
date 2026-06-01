document.addEventListener('DOMContentLoaded', () => {
    // 🎛️ 듀얼 슬라이더 제어
    const sliderMin = document.getElementById('slider-min');
    const sliderMax = document.getElementById('slider-max');
    const budgetMinVal = document.getElementById('budget-min-val');
    const budgetMaxVal = document.getElementById('budget-max-val');
    const startBtn = document.getElementById('start-btn');

    const regionNameDisplay = document.getElementById('current-region-name');
    const aptListDisplay = document.getElementById('dynamic-apartment-list');
    const filteredCountDisplay = document.getElementById('filtered-count');
    const mapRegions = document.querySelectorAll('.map-region');
    const prefCards = document.querySelectorAll('.toggle-pref');

    let currentSelectedRegion = 'seoul';
    let userPreference = 'all'; // 'old' (구축), 'new' (신축), 'all' (전체)

    // 🏢 전국구 시세별/성향별 초대형 70+ 단지 데이터셋
    const apartmentMockData = {
        seoul: [
            { name: "압구정 현대 7차", price: 30, type: "old", spec: "강남구 · 560세대 · 대한민국 정통 최고 부촌 재건축 끝판왕" },
            { name: "아크로리버파크", price: 28, type: "new", spec: "서초구 · 1612세대 · 신반포 한강뷰 하이엔드 대장 신축" },
            { name: "반포자이", price: 25, type: "old", spec: "서초구 · 3410세대 · 반포 고품격 원조 대단지" },
            { name: "래미안 원베일리", price: 29, type: "new", spec: "서초구 · 2990세대 · 한강변 초호화 커뮤니티 신축 대장" },
            { name: "도곡렉슬", price: 23, type: "old", spec: "강남구 · 3002세대 · 대치동 학원가 초인접 명품 대단지" },
            { name: "은마아파트", price: 21, type: "old", spec: "강남구 · 4424세대 · 대치동 재건축 상징이자 최대어" },
            { name: "디에이치 퍼스티어 아이파크", price: 22, type: "new", spec: "강남구 · 6702세대 · 개포동 초대형 신축 메머드급" },
            { name: "잠실 주공 5단지", price: 20, type: "old", spec: "송파구 · 3930세대 · 잠실역 초역세권 한강변 최고령 재건축" },
            { name: "잠실엘스", price: 19, type: "old", spec: "송파구 · 5678세대 · 엘리트 라인 유망 주거 중심지" },
            { name: "헬리오시티", price: 17, type: "new", spec: "송파구 · 9510세대 · 국내 최대 규모 단지 미니신도시급 인프라" },
            { name: "성수 트리마제", price: 27, type: "new", spec: "성동구 · 688세대 · 성수동 조식 서비스 연예인 아파트" },
            { name: "아크로서울포레스트", price: 30, type: "new", spec: "성동구 · 280세대 · 서울숲 1열 영구 조망 하이엔드 복합" },
            { name: "경희궁자이 2단지", price: 17, type: "new", spec: "종로구 · 1148세대 · 사대문 안 대장주 직주근접 최고" },
            { name: "마포래미안푸르지오", price: 16, type: "old", spec: "마포구 · 3885세대 · 강북 아파트 시장 이끈 마포 대장주" },
            { name: "마포더클래시", price: 15, type: "new", spec: "마포구 · 1419세대 · 이대역/아현역 역세권 신축 단지" },
            { name: "목동신시가지 7단지", price: 15, type: "old", spec: "양천구 · 2550세대 · 목동 대지지분 깡패 학군 핵심단지" },
            { name: "목동 센트럴 아이파크위브", price: 11, type: "new", spec: "양천구 · 3045세대 · 목동 인근 쾌적 신축 대단지" },
            { name: "고덕그라시움", price: 14, type: "new", spec: "강동구 · 4932세대 · 고덕지구 지하철 직결 최고 랜드마크" },
            { name: "둔촌 올림픽파크포레온", price: 16, type: "new", spec: "강동구 · 12032세대 · 단일 단지 역사상 단연 국내 최대" },
            { name: "신길센트럴자이", price: 12, type: "new", spec: "영등포구 · 1008세대 · 신길뉴타운 이끄는 프리미엄 신축" },
            { name: "여의도 시범아파트", price: 18, type: "old", spec: "영등포구 · 1584세대 · 한강변 신통기획 여의도 재건축 선두" },
            { name: "DMC파크뷰자이", price: 11, type: "old", spec: "서대문구 · 4300세대 · 가재울 가성비 끝판왕 명품단지" },
            { name: "이문래미안라그란데", price: 9, type: "new", spec: "동대문구 · 3069세대 · 외대앞 대규모 뉴타운 신흥 주거단지" },
            { name: "노원 상계주공 7단지", price: 6, type: "old", spec: "노원구 · 2260세대 · 창동역 역세권 개발 수혜 재건축 단지" },
            { name: "중계주공 5단지", price: 6, type: "old", spec: "노원구 · 2328세대 · 은행사거리 명문 대치동급 학원가 도보" },
            { name: "도봉 동아청솔", price: 7, type: "old", spec: "도봉구 · 1981세대 · 창동역 인프라 평지 대단지 가성비 거주" }
        ],
        gyeonggi: [
            { name: "판교 붓들마을 8단지", price: 18, type: "old", spec: "성남 분당구 · 동판교 초역세권 IT 직주근접 최고존엄" },
            { name: "판교역 알파리움 1단지", price: 19, type: "new", spec: "성남 분당구 · 판교역 중심 고급 주상복합 슬세권" },
            { name: "분당 시범우성", price: 13, type: "old", spec: "성남 분당구 · 서현역 서현학군 선도 1기 신도시 시범단지" },
            { name: "분당 정자상록우성", price: 14, type: "old", spec: "성남 분당구 · 정자역 카페거리 더블역세권 학군지 대어" },
            { name: "분당 파크뷰", price: 16, type: "old", spec: "성남 분당구 · 탄천 조망 정자동 최고급 아파트 명성" },
            { name: "광교중흥S-클래스", price: 15, type: "new", spec: "수원 영통구 · 광교호수공원 영구조망 프리미엄 주상복합" },
            { name: "자연앤힐스테이트", price: 12, type: "old", spec: "수원 영통구 · 경기도청역 최고 입지 인프라 핵심 단지" },
            { name: "수원 매탄위브하늘채", price: 6, type: "old", spec: "수원 영통구 · 삼성전자 본사 직주근접 원조 메머드단지" },
            { name: "동탄역 롯데캐슬", price: 14, type: "new", spec: "화성시 · 백화점·SRT·GTX-A 리얼 원스톱 슬세권 대장" },
            { name: "동탄역 린스트라우스 더중앙", price: 10, type: "new", spec: "화성시 · 동탄 여울공원 및 동탄역 도보권 고층 뷰" },
            { name: "위례자이", price: 12, type: "old", spec: "하남시 · 위례신도시 호수공원 연계 최고 선호도" },
            { name: "위례포레자이", price: 10, type: "new", spec: "하남시 · 북위례 청량 숲세권 입지 쾌적 신축" },
            { name: "미사강변 센트럴자이", price: 10, type: "old", spec: "하남시 · 미사호수공원 상권 결합 만족도 1위 대장" },
            { name: "킨텍스원시티", price: 11, type: "new", spec: "고양 일산동구 · 방송영상밸리 인접 일산 최고가 스카이라인" },
            { name: "일산 후곡우성 3단지", price: 5, type: "old", spec: "고양 일산서구 · 일산 대표 학원가 유해시설 제로 청정지역" },
            { name: "평촌 향촌롯데", price: 10, type: "old", spec: "안양 동안구 · 평촌 중앙공원 학원가 셔틀 안타는 1등 단지" },
            { name: "평촌 어바인퍼스트", price: 8, type: "new", spec: "안양 동안구 · 호계동 일대 대규모 신흥 신축 단지" },
            { name: "성복역 롯데캐슬 골드타운", price: 9, type: "new", spec: "용인 수지구 · 수지 최고 황금라인 신분당선 몰세권 직결" },
            { name: "수지 신정마을 9단지", price: 6, type: "old", spec: "용인 수지구 · 수지구청역 리모델링 추진 유망 속도단지" }
        ],
        gangwon: [
            { name: "속초디오션자이", price: 7, type: "new", spec: "속초시 · 바다 조망 인피니티풀 완비 리조트형 주거" },
            { name: "속초 아이파크", price: 5, type: "old", spec: "속초시 · 속초해수욕장 도보 3분 진정한 서핑 라이프" },
            { name: "춘천 센트럴타워 푸르지오", price: 6, type: "new", spec: "춘천시 · 최고층 주상복합 공지천 조망 랜드마크" },
            { name: "춘천 e편한세상 한숲시티", price: 5, type: "new", spec: "춘천시 · 대규모 고급 커뮤니티 수영장 사우나 완비" },
            { name: "춘천 퇴계주공 5단지", price: 2, type: "old", spec: "춘천시 · 남춘천역 인근 역세권 교통 편리 가성비 구축" },
            { name: "원주 더샵센트럴파크 1단지", price: 5, type: "new", spec: "원주시 · 무실동 신도심 중심 중앙공원 품은 명품" },
            { name: "강릉 유천유승한내들", price: 4, type: "old", spec: "강릉시 · 유천지구 인프라 우수 학군 밀집 교동 인접" },
            { name: "강릉 송정 한신더휴", price: 3, type: "new", spec: "강릉시 · 송정해변 안목커피거리 인접 자연친화 힐링" }
        ],
        chungcheong: [
            { name: "대전 크로바아파트", price: 12, type: "old", spec: "대전 서구 · 충청권 부동의 대장 한밭초·문정중 정통 학군" },
            { name: "대전 목련아파트", price: 10, type: "old", spec: "대전 서구 · 크로바 쌍벽 둔산동 명문 인프라 학원가 최인접" },
            { name: "대전 도안아이파크 2단지", price: 8, type: "new", spec: "대전 유성구 · 호수공원 예정지 인근 신축 브랜드 대단지" },
            { name: "도안 린스트라우스 하우스", price: 7, type: "new", spec: "대전 유성구 · 대전 트램 호재 세련된 외관 주상복합" },
            { name: "세종 제일풍경채 퍼스트파크", price: 8, type: "old", spec: "세종시 · 2-2생활권 중심 설계공모 1위 명품 조경 단지" },
            { name: "세종 새뜸마을 11단지 더샵자이", price: 7, type: "old", spec: "세종시 · 다정동 항아리상권 슬세권 학군지 최고" },
            { name: "세종 해밀마을 2단지 마스터힐스", price: 5, type: "new", spec: "세종시 · 충남대병원 인접 6생활권 신축 쾌적 인프라" },
            { name: "천안 불당 지웰더샵", price: 8, type: "old", spec: "천안시 · 신불당 아름다운 초등학교 중심 불패 대장주" },
            { name: "천안 불당 지웰시티푸르지오", price: 7, type: "new", spec: "천안시 · 중심상업지구 CGV 인프라 바로 앞 고층단지" },
            { name: "청주 지웰시티 2차", price: 6, type: "old", spec: "청주시 · 복대동 현대백화점 지웰몰 초밀착 원스톱 라이프" },
            { name: "청주 가경아이파크 4단지", price: 5, type: "new", spec: "청주시 · 고속버스터미널 인접 청주 선호도 1위 신축 벨트" }
        ],
        jeolla: [
            { name: "광주 봉선동 한국아델리움 3차", price: 11, type: "old", spec: "광주 남구 · '광주의 대치동' 봉선동 압도적 학원가 종결자" },
            { name: "광주 봉선 쌍용예가", price: 7, type: "old", spec: "광주 남구 · 조용하고 쾌적한 전통 주거지 학군 최우수" },
            { name: "광주 봉선 제일풍경채 엘리트파크", price: 8, type: "new", spec: "광주 남구 · 봉선동 내 준신축급 브랜드 대단지" },
            { name: "광주 상무센트럴자이", price: 9, type: "new", spec: "광주 서구 · 상무지구 구 도심 속 하이엔드 프리미엄 신축" },
            { name: "광주 수완지구 호반베르디움 1차", price: 5, type: "old", spec: "광주 광산구 · 호수공원 상권 학원 인프라 완비 수완 대장" },
            { name: "전주 에코시티 더샵 2차", price: 5, type: "old", spec: "전주시 · 송천동 에코시티 세병호 파노라마 에코 인프라" },
            { name: "전주 에코시티 한화포레나", price: 6, type: "new", spec: "전주시 · 최고층 랜드마크 상업지구 밀착 신축 주상복합" },
            { name: "전주 혁신대방디엠시티", price: 5, type: "new", spec: "전주시 · 혁신도시 공공기관 직주근접 메가박스 품은 단지" },
            { name: "여수 웅천지웰 3차", price: 4, type: "old", spec: "여수시 · 가막만 요션뷰 바다 산책로 정돈된 택지지구" },
            { name: "순천 신대지구 중흥 7단지", price: 4, type: "old", spec: "순천시 · 광양만권 배후도시 가장 살기 좋은 신도시 인프라" }
        ],
        gyeongsang: [
            { name: "해운대 엘시티 더샵", price: 29, type: "new", spec: "부산 해운대구 · 해운대 백사장 백드롭 101층 국내 최고 오션뷰" },
            { name: "해운대 두산위브더제니스", price: 16, type: "old", spec: "부산 해운대구 · 마린시티 최고급 고급 주거 마천루의 대명사" },
            { name: "삼익비치 재건축", price: 17, type: "old", spec: "부산 수영구 · 남천동 광안대교 리얼 1열 수영구 재건축 최대어" },
            { name: "더샵센텀파크 1단지", price: 11, type: "old", spec: "부산 해운대구 · 센텀시티 벡스코·신세계 명문 학군 올인원" },
            { name: "해운대 자이 2차", price: 10, type: "new", spec: "부산 해운대구 · 우동 핵심 입지 역세권 시세 리딩 준신축" },
            { name: "대연 롯데캐슬 레전드", price: 7, type: "old", spec: "부산 남구 · 3149세대 · 못골역 평지 메머드 대단지 위용" },
            { name: "레이카운티", price: 8, type: "new", spec: "부산 연제구 · 4470세대 · 거제동 법조타운 역세권 메머드급 신축" },
            { name: "명지국제신도시 더샵퍼스트월드", price: 5, type: "new", spec: "부산 강서구 · 서부산 법조타운 스타필드 인근 대장 신축" },
            { name: "대구 수성 두산위브더제니스", price: 14, type: "old", spec: "대구 수성구 · 범어역 동도초·경신고 범어네거리 정통 부촌" },
            { name: "대구 범어센트럴푸르지오", price: 9, type: "new", spec: "대구 수성구 · 범어역 초인접 역세권 프리미엄 신축 주상복합" },
            { name: "만촌 삼정그린코아 에듀파크", price: 11, type: "new", spec: "대구 수성구 · 만촌 학원가 도보 1분 자녀 교육 특화 단지" },
            { name: "수성범어W", price: 12, type: "new", spec: "대구 수성구 · 범어네거리 마천루 최고층 대단지 신축 랜드마크" },
            { name: "울산 신정 문수로아이파크 2단지", price: 8, type: "old", spec: "울산 남구 · 울산의 대치동 신정동 학원가 부동의 원탑" },
            { name: "울산 지웰시티자이", price: 5, type: "new", spec: "울산 동구 · 서부동 대규모 복합 커뮤니티 카카오 홈 연동 신축" },
            { name: "창원 용지더샵레이크파크", price: 8, type: "old", spec: "창원 성산구 · 용지호수 잔디광장 앞 창원 원탑 최고가 단지" },
            { name: "창원 유니시티 1단지", price: 7, type: "new", spec: "창원 의창구 · 스타필드 예정지 어반브릭스 대규모 공원 신축" }
        ]
    };

    // 🔄 실시간 다이나믹 복합 필터 알고리즘
    function updateAndFilterApartments() {
        let minVal = parseInt(sliderMin.value);
        let maxVal = parseInt(sliderMax.value);

        // 크로스오버 방지 (최솟값이 최댓값보다 커지면 보정)
        if (minVal > maxVal) {
            let temp = minVal;
            minVal = maxVal;
            maxVal = temp;
        }

        // 텍스트 실시간 연동
        budgetMinVal.textContent = minVal;
        budgetMaxVal.textContent = maxVal;

        const apartmentsInRegion = apartmentMockData[currentSelectedRegion] || [];

        // 1단계: 2축 슬라이더 가격 필터링
        let filteredApartments = apartmentsInRegion.filter(apt => {
            return apt.price >= minVal && apt.price <= maxVal;
        });

        // 2단계: 취향 밸런스(구축/신축) 매칭에 따른 우선 정렬 스왑
        if (userPreference !== 'all') {
            filteredApartments.sort((a, b) => {
                const aMatch = (a.type === userPreference) ? 1 : 0;
                const bMatch = (b.type === userPreference) ? 1 : 0;
                return bMatch - aMatch; // 내 성향 매물이 상단에 노출되도록 배치
            });
        }

        filteredCountDisplay.textContent = filteredApartments.length;
        aptListDisplay.innerHTML = "";

        if (filteredApartments.length === 0) {
            aptListDisplay.innerHTML = `
                <div class="no-data">
                    😥 선택하신 [${minVal}억 ~ ${maxVal}억] 예산에 맞는 매물이 이 지역에 없습니다.<br>
                    듀얼 슬라이더 축의 범위를 더 넓혀보세요!
                </div>`;
            return;
        }

        // DOM 카드 생성 및 배치
        filteredApartments.forEach(apt => {
            const div = document.createElement('div');
            div.className = "mini-apt-item";
            
            // 유저의 취향 카드와 일치할 경우 하이라이트 클래스 가동
            const isMatch = (userPreference !== 'all' && apt.type === userPreference);
            if (isMatch) {
                div.classList.add('match-highlight');
            }

            const typeTag = apt.type === "old" ? 
                '<span class="tag-badge tag-old">⚒️ 구축·재건축</span>' : 
                (apt.type === "new" ? '<span class="tag-badge tag-new">✨ 신축·역세권</span>' : '');
                
            const matchTag = isMatch ? '<span class="tag-badge tag-match">🎯 취향 저격</span>' : '';

            div.innerHTML = `
                <div class="apt-info">
                    <div class="apt-tag-box">
                        ${typeTag}
                        ${matchTag}
                    </div>
                    <span class="apt-name">🏢 ${apt.name}</span>
                    <span class="apt-spec">${apt.spec}</span>
                </div>
                <span class="apt-price-tag">${apt.price}억 대</span>
            `;
            aptListDisplay.appendChild(div);
        });
    }

    // 슬라이더 이벤트 바인딩
    sliderMin.addEventListener('input', updateAndFilterApartments);
    sliderMax.addEventListener('input', updateAndFilterApartments);

    // ⚡ 구축 vs 신축 성향 셀렉터 바인딩
    prefCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const selectedCard = e.currentTarget;
            const clickedPref = selectedCard.getAttribute('data-pref');
            
            if (selectedCard.classList.contains('selected')) {
                selectedCard.classList.remove('selected');
                userPreference = 'all'; // 해제 시 전체 노출
            } else {
                prefCards.forEach(c => c.classList.remove('selected'));
                selectedCard.classList.add('selected');
                userPreference = clickedPref;
            }
            
            localStorage.setItem('user_apt_preference', userPreference);
            updateAndFilterApartments(); // 즉시 리스트 정렬 갱신
        });
    });

    // 지도 SVG 인터랙션
    mapRegions.forEach(region => {
        region.addEventListener('click', (e) => {
            mapRegions.forEach(r => r.classList.remove('active'));
            const selectedRegion = e.target;
            selectedRegion.classList.add('active');
            
            currentSelectedRegion = selectedRegion.getAttribute('data-region');
            const koreanNames = { seoul: "서울", gyeonggi: "경기", gangwon: "강원", chungcheong: "충청", jeolla: "전라", gyeongsang: "경상" };
            regionNameDisplay.textContent = koreanNames[currentSelectedRegion];
            
            updateAndFilterApartments();
        });
    });

    startBtn.addEventListener('click', () => {
        let minVal = parseInt(sliderMin.value);
        let maxVal = parseInt(sliderMax.value);
        if (minVal > maxVal) { let t = minVal; minVal = maxVal; maxVal = t; }

        localStorage.setItem('user_min_budget', minVal);
        localStorage.setItem('user_max_budget', maxVal);
        alert(`🚀 [영끌 월드컵 엔진 구동]\n지역: ${regionNameDisplay.textContent}\n범위: ${minVal}억 ~ ${maxVal}억\n선택 성향 아파트를 우선 배치하여 토너먼트를 시작합니다!`);
    });

    // 최초 기동
    updateAndFilterApartments();
});
