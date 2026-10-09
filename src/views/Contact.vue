<script setup>
import { MapPin, Phone, Mail } from 'lucide-vue-next'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <div class="contact-page">
    <div class="contact-header">
      <h1>{{ t('contact.title') }}</h1>
      <p>
        {{ t('contact.subtitle') }}
      </p>
    </div>

    <div class="contact-content">
      <div class="contact-info">
        <div class="info-item">
          <div class="info-icon"><MapPin :size="28" :stroke-width="1.5" color="#6644ff" /></div>
          <div>
            <h3>{{ t('contact.office') }}</h3>
            <p>123 Event Street, Tech City, 10101</p>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon"><Phone :size="28" :stroke-width="1.5" color="#6644ff" /></div>
          <div>
            <h3>{{ t('contact.phone') }}</h3>
            <p><a href="tel:+6281234567890">+62 812 3456 7890</a></p>
          </div>
        </div>
        <div class="info-item">
          <div class="info-icon"><Mail :size="28" :stroke-width="1.5" color="#6644ff" /></div>
          <div>
            <h3>{{ t('contact.email') }}</h3>
            <p><a href="mailto:hello@gatherly.com">hello@gatherly.com</a></p>
          </div>
        </div>
      </div>

      <div class="contact-form">
        <form @submit.prevent>
          <div class="form-group">
            <label for="contact-name">{{ t('contact.nameLabel') }}</label>
            <input
              id="contact-name"
              type="text"
              autocomplete="name"
              :placeholder="t('contact.namePlaceholder')"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="contact-email">{{ t('contact.emailLabel') }}</label>
            <input
              id="contact-email"
              type="email"
              autocomplete="email"
              inputmode="email"
              :placeholder="t('contact.emailPlaceholder')"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="contact-message">{{ t('contact.messageLabel') }}</label>
            <textarea
              id="contact-message"
              :placeholder="t('contact.messagePlaceholder')"
              rows="5"
              class="form-control"
            ></textarea>
          </div>
          <button class="btn-submit">{{ t('contact.sendBtn') }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  animation: fadeIn 0.5s ease;
}

.contact-header {
  text-align: center;
  margin-bottom: 2rem;
}

.contact-header h1 {
  font-size: clamp(2rem, 7vw, 2.8rem);
  color: #1c1948;
  margin-bottom: 1rem;
}

.contact-header p {
  font-size: 1rem;
  color: #666;
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.info-icon {
  background: rgba(102, 68, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-item h3 {
  color: #1c1948;
  margin-bottom: 0.5rem;
}

.info-item p {
  color: #555;
  line-height: 1.5;
}

.info-item a {
  display: inline-block;
  padding: 10px 0;
  margin: -10px 0;
  text-decoration: none;
}

.contact-form {
  flex: 1.5;
  background: white;
  padding: 1.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
}

.form-control {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-control:focus {
  border-color: #6644ff;
}

.btn-submit {
  width: 100%;
  padding: 1rem;
  background: #6644ff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-submit:hover {
  background: #5533ee;
}

@media (min-width: 769px) {
  .contact-header {
    margin-bottom: 4rem;
  }
  .contact-header p {
    font-size: 1.1rem;
  }
  .contact-content {
    flex-direction: row;
    gap: 4rem;
  }
  .contact-form {
    padding: 2.5rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
