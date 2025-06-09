import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, AlertCircle, Loader, Key, Globe, Database } from 'lucide-react';
import { vocabularyService } from '../services/vocabularyService';

interface ImportProgress {
  category: string;
  status: 'pending' | 'importing' | 'success' | 'error';
  count?: number;
  error?: string;
}

export function VocabularyImporter() {
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState<ImportProgress[]>([]);
  const [isConfigured, setIsConfigured] = useState(false);
  const [importStats, setImportStats] = useState({ completed: 0, total: 0, categories: [] as string[] });

  useEffect(() => {
    setIsConfigured(vocabularyService.isConfigured());
    updateImportStats();
  }, []);

  const updateImportStats = () => {
    const stats = vocabularyService.getImportProgress('pt');
    setImportStats(stats);
  };

  const categories = [
    'Greetings', 'Home & Family', 'Food & Dining', 'Travel & Transportation', 
    'Work & Career', 'Health & Body', 'Education', 'Shopping', 
    'Time & Weather', 'Colors & Descriptions', 'Numbers', 'Common Verbs'
  ];

  const handleImportAll = async () => {
    if (!isConfigured) {
      alert('Please configure your Google Translate API key first!');
      return;
    }

    setIsImporting(true);
    
    // Initialize progress tracking
    const initialProgress: ImportProgress[] = categories.map(category => ({
      category,
      status: 'pending'
    }));
    setProgress(initialProgress);

    // Import vocabulary for each category
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      
      // Update status to importing
      setProgress(prev => prev.map((item, index) => 
        index === i ? { ...item, status: 'importing' } : item
      ));

      try {
        const vocabulary = await vocabularyService.generateVocabularyForCategory(category, 'pt');
        
        // Update status to success
        setProgress(prev => prev.map((item, index) => 
          index === i 
            ? { ...item, status: 'success', count: vocabulary.length }
            : item
        ));
      } catch (error) {
        // Update status to error
        setProgress(prev => prev.map((item, index) => 
          index === i 
            ? { ...item, status: 'error', error: error instanceof Error ? error.message : 'Unknown error' }
            : item
        ));
      }
    }

    setIsImporting(false);
    updateImportStats();
  };

  const handleImportCategory = async (category: string) => {
    if (!isConfigured) {
      alert('Please configure your Google Translate API key first!');
      return;
    }

    const categoryIndex = categories.indexOf(category);
    
    setProgress(prev => prev.map((item, index) => 
      index === categoryIndex ? { ...item, status: 'importing' } : item
    ));

    try {
      const vocabulary = await vocabularyService.generateVocabularyForCategory(category, 'pt');
      
      setProgress(prev => prev.map((item, index) => 
        index === categoryIndex 
          ? { ...item, status: 'success', count: vocabulary.length }
          : item
      ));
    } catch (error) {
      setProgress(prev => prev.map((item, index) => 
        index === categoryIndex 
          ? { ...item, status: 'error', error: error instanceof Error ? error.message : 'Unknown error' }
          : item
      ));
    }

    updateImportStats();
  };

  const getStatusIcon = (status: ImportProgress['status']) => {
    switch (status) {
      case 'pending':
        return <div className="w-4 h-4 rounded-full bg-gray-300" />;
      case 'importing':
        return <Loader className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const completedCount = progress.filter(p => p.status === 'success').length;
  const totalCount = progress.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-100 p-4 rounded-full inline-flex mb-6">
            <Database className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Portuguese Vocabulary Importer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Import comprehensive Portuguese vocabulary using Google Translate API. 
            Build a complete database with {categories.length} categories and over 300 essential words.
          </p>
        </div>

        {/* API Configuration Status */}
        <div className={`mb-8 p-4 rounded-xl border ${
          isConfigured 
            ? 'bg-emerald-50 border-emerald-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-center space-x-3">
            <Key className={`w-5 h-5 ${isConfigured ? 'text-emerald-600' : 'text-yellow-600'}`} />
            <div>
              <h3 className={`font-semibold ${isConfigured ? 'text-emerald-900' : 'text-yellow-900'}`}>
                {isConfigured ? 'API Configured' : 'API Configuration Required'}
              </h3>
              <p className={`text-sm ${isConfigured ? 'text-emerald-700' : 'text-yellow-700'}`}>
                {isConfigured 
                  ? 'Google Translate API is ready to use'
                  : 'Add VITE_GOOGLE_TRANSLATE_API_KEY to your .env file'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Current Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">{importStats.completed}</div>
            <div className="text-gray-600">Categories Imported</div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">{importStats.total}</div>
            <div className="text-gray-600">Total Categories</div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {Math.round((importStats.completed / importStats.total) * 100)}%
            </div>
            <div className="text-gray-600">Complete</div>
          </div>
        </div>

        {/* Import Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={handleImportAll}
            disabled={isImporting || !isConfigured}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            {isImporting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Importing All Categories...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Import All Categories</span>
              </>
            )}
          </button>
          
          <button
            onClick={updateImportStats}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-4 rounded-xl transition-colors"
          >
            Refresh Status
          </button>
        </div>

        {/* Progress Bar */}
        {progress.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Import Progress</span>
              <span>{completedCount} / {totalCount} completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => {
            const progressItem = progress.find(p => p.category === category);
            const isStored = localStorage.getItem(`vocabulary_pt_${category}`);
            
            return (
              <div key={category} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{category}</h3>
                  {getStatusIcon(progressItem?.status || (isStored ? 'success' : 'pending'))}
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  {progressItem?.count && (
                    <span>{progressItem.count} words imported</span>
                  )}
                  {isStored && !progressItem && (
                    <span>Previously imported</span>
                  )}
                  {progressItem?.error && (
                    <span className="text-red-600">{progressItem.error}</span>
                  )}
                </div>
                
                <button
                  onClick={() => handleImportCategory(category)}
                  disabled={isImporting || !isConfigured || progressItem?.status === 'importing'}
                  className="w-full bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-medium py-2 px-3 rounded-lg border border-gray-200 transition-colors text-sm"
                >
                  {progressItem?.status === 'importing' ? 'Importing...' : 'Import Category'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Setup Instructions */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Setup Instructions</span>
          </h4>
          <ol className="text-sm text-blue-800 space-y-2">
            <li>1. Get a Google Translate API key from <a href="https://cloud.google.com/translate" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
            <li>2. Create a <code className="bg-blue-100 px-1 rounded">.env</code> file in your project root</li>
            <li>3. Add <code className="bg-blue-100 px-1 rounded">VITE_GOOGLE_TRANSLATE_API_KEY=your_api_key_here</code></li>
            <li>4. Restart your development server</li>
            <li>5. Click "Import All Categories" to build your vocabulary database</li>
          </ol>
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> The API will translate ~300 English words to Portuguese with examples and pronunciation guides. 
              Rate limiting is built-in to respect API quotas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}