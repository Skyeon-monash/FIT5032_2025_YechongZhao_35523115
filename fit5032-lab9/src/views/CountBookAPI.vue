<template>
  <div class="count-book-api-container">
    <header class="page-header">
      <h1>Cloud Function Call Test (From Local JSON File)</h1>
      <p>
        This page demonstrates a complete flow: Load local JSON data → Transform data format → Call cloud function → Display result.
      </p>
    </header>

    <!-- Panel 1: Display loaded and transformed local data -->
    <div class="card data-panel">
      <div class="card-header">
        <h3>1. Data to Send</h3>
      </div>
      <div class="card-body">
        <div v-if="isDataReady">
          <p>The following data was loaded from <code>src/assets/json/authors.json</code> and transformed into the format required by the API. It will be sent as the request body.</p>
          <pre>{{ JSON.stringify(payloadToSend, null, 2) }}</pre>
        </div>
        <div v-else class="status-display initial">
          <p>Loading data from local file...</p>
        </div>
      </div>
    </div>

    <!-- Panel 2: Action and API call -->
    <div class="card action-panel">
      <div class="card-header">
        <h3>2. Call Cloud Function</h3>
      </div>
      <div class="card-body">
        <button @click="callCloudFunction" :disabled="!isDataReady || isLoading">
          <span v-if="!isDataReady">Waiting for data to load...</span>
          <span v-else-if="isLoading">Calling...</span>
          <span v-else>🚀 Send data to cloud function</span>
        </button>
      </div>
    </div>
    
    <!-- Panel 3: Display cloud function results -->
    <div class="card result-panel">
      <div class="card-header">
        <h3>3. Cloud Function Response</h3>
      </div>
      <div class="card-body">
        <div v-if="isLoading" class="status-display loading">
          <div class="spinner"></div>
          <p>Waiting for cloud function response...</p>
        </div>
        <div v-if="apiResponse" class="status-display success">
          <h4>✅ Request Successful!</h4>
          <div class="book-count-wrapper">
            <span>Total calculated by cloud function:</span>
            <span class="book-count-number">{{ apiResponse.book_count }}</span>
          </div>
          <p><strong>Cloud function message:</strong> "{{ apiResponse.message }}"</p>
        </div>
        <div v-if="errorMessage" class="status-display error">
          <h4>❌ Request Failed</h4>
          <p>{{ errorMessage }}</p>
        </div>
        <div v-if="!isLoading && !apiResponse && !errorMessage" class="status-display initial">
          <p>Please click the button to get results.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// =======================【CONFIGURE HERE】=======================
// ⚠️ Key step: Replace with your own cloud function public HTTP trigger URL
const cloudFunctionUrl = "https://count-book-xnuhfowcym.cn-hongkong.fcapp.run";
// ===============================================================

// --- Reactive state ---
const isLoading = ref(false);       // API call loading state
const isDataReady = ref(false);     // Whether local data is loaded and ready
const apiResponse = ref(null);      // Store successful API response
const errorMessage = ref('');       // Store error message
const payloadToSend = ref(null);    // Store transformed data ready to send to API

// --- On component mount ---
onMounted(() => {
  // When the component loads, automatically read local JSON file and prepare data
  loadAndPrepareData();
});

// --- Methods ---

/**
 * Load local authors.json file asynchronously and transform it into the format required by the cloud function.
 */
const loadAndPrepareData = async () => {
  try {
    // Vite/Vue supports dynamic import to load JSON files
    // `@` is an alias for the src directory (standard in Vue projects)
    const jsonData = await import('@/assets/json/authors.json');
    const authors = jsonData.default;

    // **Core transformation logic**
    // Use flatMap to combine all authors’ famousWorks arrays into one array of books
    const allBooks = authors.flatMap(author => 
      author.famousWorks.map(book => ({
        title: book.title,
        year: book.year,
        authorName: author.name
      }))
    );

    // Build final data structure for cloud function
    payloadToSend.value = {
      data_source: "Vue Client from local authors.json",
      books: allBooks
    };

    isDataReady.value = true;
    console.log("Local data loaded and transformed successfully:", payloadToSend.value);

  } catch (error) {
    console.error("Error loading or transforming local JSON data:", error);
    errorMessage.value = "Failed to load authors.json file. Please check if the file exists and is properly formatted.";
  }
};

/**
 * Call the cloud function asynchronously
 */
const callCloudFunction = async () => {
  if (!isDataReady.value) {
    alert("Data is not ready yet. Please wait.");
    return;
  }
  
  isLoading.value = true;
  apiResponse.value = null;
  errorMessage.value = '';

  if (cloudFunctionUrl.includes("xxxxxxxx")) {
      errorMessage.value = "Configuration error: Please replace the cloudFunctionUrl variable in CountBookAPI.vue with your own cloud function URL!";
      isLoading.value = false;
      return;
  }

  try {
    // Use axios to send transformed data (payloadToSend.value)
    const response = await axios.post(cloudFunctionUrl, payloadToSend.value);
    apiResponse.value = response.data;
    console.log("Cloud function responded successfully:", response.data);

  } catch (error) {
    console.error("API call failed:", error);
    if (error.response) {
      errorMessage.value = `Server returned error: Status code ${error.response.status}. Response: ${JSON.stringify(error.response.data)}`;
    } else if (error.request) {
      errorMessage.value = "Unable to connect to the server. Please check your network, URL, and CORS settings.";
    } else {
      errorMessage.value = `Request setup error: ${error.message}`;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.count-book-api-container {
  max-width: 750px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.page-header h1 {
  font-size: 2.2rem;
  font-weight: 600;
  color: #2c3e50;
}
.page-header p {
  font-size: 1.1rem;
  color: #606266;
}
.card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}
.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #ebeef5;
}
.card-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}
.card-body {
  padding: 1.5rem;
}
.card-body p {
  margin-top: 0;
  line-height: 1.6;
}
button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}
button:disabled {
  background-color: #a9cce3;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.result-panel .card-body, .data-panel .card-body {
  min-height: 100px;
}
.status-display {
  text-align: center;
}
.success h4 { color: #2ecc71; }
.error h4 { color: #e74c3c; }
.book-count-wrapper {
  margin: 1rem 0;
  font-size: 1.5rem;
  font-weight: 500;
}
.book-count-number {
  font-size: 3rem;
  font-weight: bold;
  color: #2ecc71;
  margin-left: 10px;
}
pre {
  background-color: #f4f4f5;
  border: 1px solid #e9e9eb;
  padding: 1rem;
  border-radius: 4px;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 0.9rem;
  max-height: 200px;
  overflow-y: auto;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3498db;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
