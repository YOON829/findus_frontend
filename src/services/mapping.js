// src/services/mappings.js

export const mappings = {
    region: {
        '시즈오카': 'shizuoka',
        '가나가와': 'kanagawa',
        '도쿄': 'tokyo',
        '이시카와': 'ishikawa',
        '치바': 'chiba'
    },
    city: {
        '누마즈': 'numazu',
        '가마쿠라': 'kamakura',
        '후지사와': 'fujisawa',
        '도쿄': 'tokyo',
        '카나자와': 'kanazawa',
        '하쿠산': 'hakusan',
        '나리타': 'narita'
    },
    district: {
        '누마즈시내': 'numazu',
        '우치우라': 'uchiura',
        '가마쿠라시내': 'kamakura',
        '에노시마': 'enoshima',
        '오다이바': 'odaiba',
        '하라주쿠': 'harajuku',
        '시모키타자와': 'shimokitazawa',
        '아키하바라': 'akihabara',
        '카나자와': 'kanazawa',
        '하쿠산시': 'hakusan',
        '나리타': 'narita'
    }
};

// 매핑된 값 가져오기 함수
export function getMappedValue(type, key) {
    return mappings[type][key.toLowerCase()];
}
