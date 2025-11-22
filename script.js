const copy_btn = document.getElementById('copy_btn');
const range_form = document.getElementById('pwd_len_control');
const checkboxs = document.querySelectorAll('.checkbox input[type="checkbox"]');
const form_btn = document.querySelector('.generate_btn');
    
const strength_value_boxes = document.querySelectorAll('.strength_value_box');
const strength_value = document.querySelector('.strength_value span');
const pwd_len = document.querySelector('.length_value');
const pwd_res = document.querySelector('.res');

const digits = '0123456789';
const lowercase_letter = 'abcdefghijklmnopqrstuvwxyz';
const uppercase_letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const special_symbols = '~!@#$%^&*()_<>?';

const alpha_dict = {
    '0': digits,
    '1': lowercase_letter,
    '2': uppercase_letter,
    '3': special_symbols
};

function generate_rn(pwd_length, mod){
    const res = [];
    const bar = 65536 - 65536%mod;
    while (res.length < pwd_length){
        const tmp = new Uint16Array(1);
        globalThis.crypto.getRandomValues(tmp);
        if (tmp[0] >= bar){
            continue;
        }
        res.push(tmp[0]%mod);
    }
    return res;
}

function generate_pwd(){
    let alphabet = '';
    const checked = [];
    for(let i = 0; i < checkboxs.length; i++){
        if (checkboxs[i].checked){
            checked.push(true);
        }
        else{checked.push(false);}
    }
    if (checked.every((e) => {return (e === false)})){throw new Error("Alphabet shouldn't be empty.");}
    for (let i = 0; i < checked.length; i++){
        if (checked[i] === true){
            alphabet += alpha_dict[i.toString()];
        }
    }
    const pwd_length = range_form.value.trim();
    const numeric_pwd_len = Number(pwd_length);
    const mod = alphabet.length;

    const random_idx = generate_rn(numeric_pwd_len, mod);
    let pwd = '';
    for (let idx of random_idx){
        pwd += alphabet[idx];
    }
    return pwd;
}

function computing_entropy(pwd){
    const set = new Set(pwd);
    const alp_diversity = set.size;
    return pwd.length * Math.log2(alp_diversity);
}

function compute_strength(pwd){
    const max_len = Number(range_form.value.trim());
    const MAX_ALPHA_SIZE = digits.length + lowercase_letter.length + uppercase_letter.length + special_symbols.length;
    const max_entropy = max_len * Math.log2(MAX_ALPHA_SIZE);
    const entropy = computing_entropy(pwd);
    return entropy/max_entropy;
}

function show_strength(pwd){
    for (b of strength_value_boxes){
        b.classList.remove('state1', 'state2', 'state3', 'state4');
    }
    let state = 0;
    const strength = compute_strength(pwd);
    if (strength <= 0.25){
        state = 1;
        strength_value.textContent = 'vulnerable';
    }
    else if (strength <= 0.5){
        state = 2;
        strength_value.textContent = 'weak';
    }
    else if (strength <= 0.75){
        state = 3;
        strength_value.textContent = 'medium'
    }
    else{
        state = 4;
        strength_value.textContent = 'robust';
    }
    if (state === 0) throw new Error('state error');
    let state_str = 'state' + state.toString();
    for (let i = 0; i < state; i ++){
        strength_value_boxes[i].classList.toggle(state_str, true);
    }
    return;
}

form_btn.addEventListener('click', () => {
    let pwd = '';
    try{
        pwd = generate_pwd();
    }
    catch(e){
        console.log(e);
        alert(e);
        return;
    }
    pwd_res.classList.toggle('res_default_display', false);
    pwd_res.textContent = pwd;
    try{
        show_strength(pwd);
    }
    catch(e){
        console.log(e);
        alert(e);
        return;
    }
});

range_form.addEventListener('change', () => {
    pwd_len.textContent = range_form.value;
});

copy_btn.addEventListener('click', () => {
    if (!pwd_res.textContent || pwd_res.textContent === 'Your password will display here'){
        alert('generate a password first!');
        return;
    }
    navigator.clipboard.writeText(pwd_res.textContent);
    alert('copyed to clipboard');
});