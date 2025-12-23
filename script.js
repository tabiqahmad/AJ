// === GLOBAL STATE ===
const state = {
  currentPage: 'accessPage',
  key: '',
  periodDigits: '',
  predictionMode: null,
  selectedOption: null,
  isLoading: false,
  currentSkullIndex: 0,
  result: null,
  titleIndex: 0,
  isFocused: false
};

const skullImages = [
  'images/gold_skeleton_skull_icon_luxury.png',
  'images/golden_skull_crossbones_emblem.png',
  'images/gold_metallic_skull_profile_artwork.png',
  'images/minimalist_gold_skull_silhouette.png'
];

// === HELPER FUNCTIONS ===
function addFocusListeners(element) {
  element.addEventListener('focus', () => { state.isFocused = true; });
  element.addEventListener('blur', () => { state.isFocused = false; });
}

// === TYPEWRITER EFFECT ===
const title = 'Ayushi Trader (PRIVATE HACK)';
const typewriterTitle = document.getElementById('typewriterTitle');

function typewriterEffect() {
  if (state.titleIndex <= title.length) {
    const displayText = title.slice(0, state.titleIndex);
    const cursor = state.titleIndex < title.length ? '<span class="form-title-cursor">|</span>' : '';
    typewriterTitle.innerHTML = displayText + cursor;
    state.titleIndex++;
    setTimeout(typewriterEffect, 25);
  }
}

// === PAGE NAVIGATION ===
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageName).classList.add('active');
  state.currentPage = pageName;
}

// === ACCESS PAGE LOGIC ===
const keyInput = document.getElementById('keyInput');
const unlockBtn = document.getElementById('unlockBtn');
const accessForm = document.getElementById('accessForm');

keyInput.addEventListener('input', (e) => {
  state.key = e.target.value;
  unlockBtn.disabled = !state.key || state.isLoading;
});

addFocusListeners(keyInput);

accessForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!state.key) return;

  const CORRECT_KEY = 'AYUSHI-HACK-2.0';
  
  state.isLoading = true;
  unlockBtn.disabled = true;
  unlockBtn.innerHTML = '<span class="btn-text">🔄 VERIFYING</span>';

  setTimeout(() => {
    state.isLoading = false;
    
    if (state.key === CORRECT_KEY) {
      showAccessGranted();

      setTimeout(() => {
        showPage('dashboardPage');
        state.titleIndex = 0;
        initDashboard();
      }, 4000);
    } else {
      unlockBtn.innerHTML = '<span class="btn-text">❌ INVALID KEY</span>';
      unlockBtn.disabled = false;
      keyInput.style.borderColor = 'rgba(239, 68, 68, 0.6)';
      
      setTimeout(() => {
        unlockBtn.innerHTML = '<span class="btn-text">Unlock System</span>';
        keyInput.style.borderColor = '';
        state.key = '';
        keyInput.value = '';
      }, 2000);
    }
  }, 1500);
});

function showAccessGranted() {
  const form = document.getElementById('accessForm');
  const granted = document.getElementById('accessGranted');
  form.style.display = 'none';
  granted.classList.remove('hidden');
  granted.classList.add('show');
}

// === DASHBOARD LOGIC ===
const periodInput = document.getElementById('periodInput');
const digitCount = document.getElementById('digitCount');
const bigSmallBtn = document.getElementById('bigSmallBtn');
const numberBtn = document.getElementById('numberBtn');
const submitBtn = document.getElementById('submitBtn');
const hackForm = document.getElementById('hackForm');
const numberInfo = document.getElementById('numberInfo');

periodInput.addEventListener('input', (e) => {
  const val = e.target.value.replace(/\D/g, '').slice(0, 3);
  state.periodDigits = val;
  periodInput.value = val;
  digitCount.textContent = `${val.length}/3`;
  updateSubmitBtn();
});

addFocusListeners(periodInput);

bigSmallBtn.addEventListener('click', () => {
  state.predictionMode = state.predictionMode === 'bignsmall' ? null : 'bignsmall';
  updatePredictionUI();
});

numberBtn.addEventListener('click', () => {
  state.predictionMode = state.predictionMode === 'number' ? null : 'number';
  state.selectedOption = null;
  updatePredictionUI();
});

function updatePredictionUI() {
  bigSmallBtn.classList.toggle('active', state.predictionMode === 'bignsmall');
  numberBtn.classList.toggle('active', state.predictionMode === 'number');
  
  numberInfo.classList.toggle('hidden', state.predictionMode !== 'number');
  
  updateSubmitBtn();
}

function updateSubmitBtn() {
  const canSubmit = state.periodDigits.length === 3 && 
                   state.predictionMode &&
                   !state.isLoading;
  submitBtn.disabled = !canSubmit;
}

hackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (!state.periodDigits || state.periodDigits.length !== 3 || !state.predictionMode) return;

  state.isLoading = true;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="btn-text">🔄 GENERATING RESULT</span>';

  setTimeout(() => {
    let result;
    
    if (state.predictionMode === 'bignsmall') {
      const randomType = Math.random() > 0.5 ? 'big' : 'small';
      result = { number: -1, type: randomType, mode: state.predictionMode };
    } else {
      const randomNumber = Math.floor(Math.random() * 10);
      result = { number: randomNumber, type: 'number', mode: state.predictionMode };
    }
    
    state.result = result;
    state.isLoading = false;
    showResult();
  }, 2000);
});

function showResult() {
  const resultContainer = document.getElementById('resultContainer');
  const resultValue = document.getElementById('resultValue');
  const periodDisplay = document.getElementById('periodDisplay');
  const hackForm = document.getElementById('hackForm');

  periodDisplay.textContent = `Period: ${state.periodDigits}`;

  if (state.result.mode === 'bignsmall') {
    resultValue.textContent = state.result.type.toUpperCase();
  } else {
    resultValue.textContent = state.result.number;
  }

  hackForm.style.display = 'none';
  resultContainer.classList.remove('hidden');
  resultContainer.classList.add('show');
}

const tryAgainBtn = document.getElementById('tryAgainBtn');
tryAgainBtn.addEventListener('click', () => {
  const resultContainer = document.getElementById('resultContainer');
  const hackForm = document.getElementById('hackForm');

  resultContainer.classList.add('hidden');
  resultContainer.classList.remove('show');
  hackForm.style.display = '';

  state.result = null;
  state.periodDigits = '';
  state.predictionMode = null;
  periodInput.value = '';
  digitCount.textContent = '0/3';
  updatePredictionUI();
  submitBtn.innerHTML = '<span class="btn-text">Get Sureshot Number</span>';
  submitBtn.disabled = false;
  state.isLoading = false;
});

// === CAROUSEL LOGIC ===
const prevSkullBtn = document.getElementById('prevSkull');
const nextSkullBtn = document.getElementById('nextSkull');
const skullImage = document.getElementById('skullImage');
const dots = document.querySelectorAll('.dot');

prevSkullBtn.addEventListener('click', () => {
  state.currentSkullIndex = (state.currentSkullIndex - 1 + skullImages.length) % skullImages.length;
  updateCarousel();
});

nextSkullBtn.addEventListener('click', () => {
  state.currentSkullIndex = (state.currentSkullIndex + 1) % skullImages.length;
  updateCarousel();
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    state.currentSkullIndex = parseInt(dot.dataset.index);
    updateCarousel();
  });
});

function updateCarousel() {
  skullImage.src = skullImages[state.currentSkullIndex];
  
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === state.currentSkullIndex);
  });
}

// === AUTO-ROTATE CAROUSEL ===
let carouselTimer;

function startCarouselRotation() {
  carouselTimer = setInterval(() => {
    state.currentSkullIndex = (state.currentSkullIndex + 1) % skullImages.length;
    updateCarousel();
  }, 4000);
}

function stopCarouselRotation() {
  clearInterval(carouselTimer);
}

function initDashboard() {
  // Reset form
  state.periodDigits = '';
  state.predictionMode = null;
  state.result = null;
  state.isLoading = false;
  state.currentSkullIndex = 0;
  
  periodInput.value = '';
  digitCount.textContent = '0/3';
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="btn-text">Get Sureshot Number</span>';
  
  updatePredictionUI();
  updateCarousel();
  startCarouselRotation();
  
  const formContainer = document.getElementById('formContainer');
  const resultContainer = document.getElementById('resultContainer');
  formContainer.classList.remove('hidden');
  resultContainer.classList.add('hidden');
  resultContainer.classList.remove('show');
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  typewriterEffect();
  showPage('accessPage');
});
