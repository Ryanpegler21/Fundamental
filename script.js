// Fundamental AI Investment Platform - Advanced JavaScript Implementation

class FundamentalPlatform {
    constructor() {
        this.apiKeys = {
            alpha: 'demo', // Replace with actual API key
            news: 'demo',
            finnhub: 'demo'
        };
        this.portfolioData = null;
        this.marketData = {};
        this.userPreferences = {};
        this.chatHistory = [];
        this.selectedSectors = new Set();
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.generateMarketInsights();
        this.loadFinancialNews();
        this.updateSentimentAnalysis();
        this.hideLoadingScreen();
        
        // Add welcome message
        setTimeout(() => {
            this.showNotification('Welcome to Fundamental AI Investment Platform! 🚀');
        }, 1000);

        // Initialize charts and data
        setTimeout(() => {
            this.createPerformanceChart();
            this.generateRebalancingSuggestions();
        }, 2000);
    }

    hideLoadingScreen() {
        // Loading screen removed - no longer needed
    }

    setupEventListeners() {
        // Risk tolerance slider
        const riskSlider = document.getElementById('riskTolerance');
        riskSlider.addEventListener('input', (e) => {
            this.updateRiskDisplay(e.target.value);
        });

        // International exposure slider
        const intlSlider = document.getElementById('internationalExposure');
        intlSlider.addEventListener('input', (e) => {
            this.updateInternationalDisplay(e.target.value);
        });

        // Sector selection
        document.querySelectorAll('.sector-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleSector(e.target);
            });
        });

        // Chat input
        //Remove Chat Input
        // document.getElementById('chatInput').addEventListener('keypress', (e) => {
        //     if (e.key === 'Enter') {
        //         this.sendMessage();
        //     }
        // });

        // Form inputs
        document.getElementById('investmentAmount').addEventListener('input', this.validateInput);
    }

    updateRiskDisplay(value) {
        const display = document.getElementById('riskDisplay');
        const levels = [
            'Very Conservative', 'Conservative', 'Moderately Conservative',
            'Moderate', 'Moderate', 'Moderately Aggressive',
            'Aggressive', 'Very Aggressive', 'High Risk', 'Extreme Risk'
        ];
        display.textContent = `${levels[value - 1]} (${value}/10)`;
    }

    updateInternationalDisplay(value) {
        const display = document.getElementById('internationalDisplay');
        display.textContent = `${value}% International`;
    }

    toggleSector(button) {
        const sector = button.dataset.sector;
        button.classList.toggle('selected');

        if (this.selectedSectors.has(sector)) {
            this.selectedSectors.delete(sector);
        } else {
            this.selectedSectors.add(sector);
        }
    }

    validateInput(e) {
        const value = parseFloat(e.target.value);
        if (value < 1000) {
            e.target.style.borderColor = 'var(--accent-red)';
        } else {
            e.target.style.borderColor = 'var(--border-color)';
        }
    }

    async loadMarketData() {
        // Removed live market data - keeping portfolio builder focus
    }

    generateMockMarketData(symbols) {
        return symbols.map(symbol => {
            const basePrice = Math.random() * 300 + 50;
            const change = (Math.random() - 0.5) * 10;
            const changePercent = (change / basePrice) * 100;

            return {
                symbol,
                price: basePrice.toFixed(2),
                change: change.toFixed(2),
                changePercent: changePercent.toFixed(2),
                volume: Math.floor(Math.random() * 10000000),
                high: (basePrice + Math.random() * 5).toFixed(2),
                low: (basePrice - Math.random() * 5).toFixed(2)
            };
        });
    }

    createMarketItem(stock) {
        const item = document.createElement('div');
        item.className = 'market-item';

        const isPositive = parseFloat(stock.change) >= 0;
        const changeClass = isPositive ? 'positive' : 'negative';
        const changeIcon = isPositive ? '↗' : '↘';

        item.innerHTML = `
            <div class="market-symbol">${stock.symbol}</div>
            <div class="market-price">$${stock.price}</div>
            <div class="market-change ${changeClass}">
                ${changeIcon} ${stock.change} (${stock.changePercent}%)
            </div>
        `;

        return item;
    }

    updateMarketData() {
        const items = document.querySelectorAll('.market-item');
        items.forEach(item => {
            const priceElement = item.querySelector('.market-price');
            const changeElement = item.querySelector('.market-change');

            // Simulate price changes
            const currentPrice = parseFloat(priceElement.textContent.replace('$', ''));
            const priceChange = (Math.random() - 0.5) * 2;
            const newPrice = Math.max(0, currentPrice + priceChange);
            const changePercent = (priceChange / currentPrice) * 100;

            priceElement.textContent = `$${newPrice.toFixed(2)}`;

            const isPositive = priceChange >= 0;
            const changeClass = isPositive ? 'positive' : 'negative';
            const changeIcon = isPositive ? '↗' : '↘';

            changeElement.className = `market-change ${changeClass}`;
            changeElement.innerHTML = `${changeIcon} ${priceChange.toFixed(2)} (${changePercent.toFixed(2)}%)`;
        });
    }

    generateMarketInsights() {
        const insights = [
            {
                icon: 'fas fa-chart-line',
                title: 'Market Momentum',
                description: 'Strong bullish sentiment detected across tech sector with AI and semiconductor stocks leading gains.'
            },
            {
                icon: 'fas fa-exclamation-triangle',
                title: 'Risk Alert',
                description: 'Elevated volatility expected due to upcoming Federal Reserve meeting and inflation data release.'
            },
            {
                icon: 'fas fa-lightbulb',
                title: 'Opportunity',
                description: 'Healthcare and utility sectors showing defensive characteristics amid market uncertainty.'
            },
            {
                icon: 'fas fa-globe',
                title: 'Global Impact',
                description: 'International markets showing divergence with emerging markets outperforming developed markets.'
            }
        ];

        const container = document.getElementById('marketInsights');
        container.innerHTML = '';

        insights.forEach(insight => {
            const item = document.createElement('div');
            item.className = 'insight-item';
            item.innerHTML = `
                <i class="${insight.icon} insight-icon"></i>
                <div class="insight-content">
                    <div class="insight-title">${insight.title}</div>
                    <div class="insight-description">${insight.description}</div>
                </div>
            `;
            container.appendChild(item);
        });
    }

    async loadFinancialNews() {
        // Simulate news data (in production, use actual news API)
        const mockNews = [
            {
                title: "Federal Reserve Signals Potential Rate Cuts Amid Economic Uncertainty",
                summary: "The Federal Reserve indicated a more dovish stance in recent meetings, suggesting potential rate cuts to support economic growth.",
                source: "Financial Times",
                time: "2 hours ago",
                sentiment: "neutral"
            },
            {
                title: "AI Semiconductor Stocks Rally on Strong Q4 Earnings",
                summary: "Major AI chipmakers reported better-than-expected earnings, driving significant gains in the technology sector.",
                source: "Wall Street Journal",
                time: "4 hours ago",
                sentiment: "positive"
            },
            {
                title: "Renewable Energy Investments Surge as Climate Policies Strengthen",
                summary: "Clean energy stocks saw substantial inflows as governments worldwide implement stronger climate policies.",
                source: "Reuters",
                time: "6 hours ago",
                sentiment: "positive"
            },
            {
                title: "Banking Sector Faces Headwinds from Regulatory Changes",
                summary: "New banking regulations could impact profitability across major financial institutions.",
                source: "Bloomberg",
                time: "8 hours ago",
                sentiment: "negative"
            }
        ];

        const newsFeed = document.getElementById('newsFeed');
        newsFeed.innerHTML = '';

        mockNews.forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <div class="news-title">${news.title}</div>
                <div class="news-summary">${news.summary}</div>
                <div class="news-meta">
                    <span>${news.source}</span>
                    <span>${news.time}</span>
                </div>
            `;
            newsFeed.appendChild(newsItem);
        });
    }

    updateSentimentAnalysis() {
        // Simulate sentiment analysis based on news and market data
        const sentiments = {
            bullish: Math.floor(Math.random() * 30) + 60,
            neutral: Math.floor(Math.random() * 20) + 10,
            bearish: Math.floor(Math.random() * 20) + 5
        };

        // Normalize to 100%
        const total = sentiments.bullish + sentiments.neutral + sentiments.bearish;
        sentiments.bullish = Math.round((sentiments.bullish / total) * 100);
        sentiments.neutral = Math.round((sentiments.neutral / total) * 100);
        sentiments.bearish = 100 - sentiments.bullish - sentiments.neutral;

        document.getElementById('bullishSentiment').textContent = `${sentiments.bullish}%`;
        document.getElementById('neutralSentiment').textContent = `${sentiments.neutral}%`;
        document.getElementById('bearishSentiment').textContent = `${sentiments.bearish}%`;

        // Update AI analysis
        const analysis = this.generateSentimentAnalysis(sentiments);
        document.getElementById('aiMarketAnalysis').textContent = analysis;
    }

    generateSentimentAnalysis(sentiments) {
        const analyses = [
            `Current market sentiment is ${sentiments.bullish > 70 ? 'strongly bullish' : sentiments.bullish > 50 ? 'bullish' : 'mixed'} with ${sentiments.bullish}% positive sentiment. This suggests ${sentiments.bullish > 60 ? 'continued upward momentum' : 'cautious optimism'} among investors.`,
            `AI analysis indicates ${sentiments.bearish > 30 ? 'elevated risk concerns' : 'moderate risk levels'} with bearish sentiment at ${sentiments.bearish}%. Consider ${sentiments.bearish > 25 ? 'defensive positioning' : 'balanced allocation'} in current market conditions.`,
            `Market psychology shows ${sentiments.neutral > 25 ? 'high uncertainty' : 'directional consensus'} with ${sentiments.neutral}% neutral sentiment. This ${sentiments.neutral > 20 ? 'suggests potential volatility' : 'indicates market conviction'} in the near term.`
        ];

        return analyses[Math.floor(Math.random() * analyses.length)];
    }

    switchTab(tabName) {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        event.target.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    }

    async generateAIRecommendations() {
        const recommendations = [
            "Based on current market conditions, consider increasing allocation to defensive sectors like utilities and consumer staples.",
            "AI analysis suggests reducing exposure to growth stocks and increasing value stock allocation given current valuations.",
            "International diversification recommended with 25-30% allocation to emerging markets for portfolio optimization.",
            "Consider ESG-focused investments as regulatory tailwinds and consumer preferences drive outperformance.",
            "Fixed income allocation should be adjusted to shorter duration given interest rate environment.",
            "Alternative investments like REITs and commodities could provide inflation protection and diversification benefits."
        ];

        const container = document.getElementById('aiRecommendations');
        container.innerHTML = '<p>Generating AI recommendations...</p>';

        // Simulate AI processing time
        setTimeout(() => {
            const randomRecommendations = this.shuffleArray(recommendations).slice(0, 3);
            container.innerHTML = randomRecommendations.map(rec => `<p>• ${rec}</p>`).join('');
        }, 2000);
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    async generatePortfolio() {
        const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
        const investmentGoals = document.getElementById('investmentGoals').value;
        const riskTolerance = parseInt(document.getElementById('riskTolerance').value);
        const timeHorizon = document.getElementById('timeHorizon').value;
        const esgPreferences = document.getElementById('esgPreferences').value;
        const internationalExposure = parseInt(document.getElementById('internationalExposure').value);

        if (!investmentAmount || investmentAmount < 1000) {
            alert('Please enter a valid investment amount (minimum $1,000)');
            return;
        }

        // Show loading state
        const generateBtn = document.getElementById('generatePortfolioBtn');
        const originalText = generateBtn.innerHTML;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Portfolio...';
        generateBtn.disabled = true;

        // Add progress indicator
        this.showLoadingProgress();

        // Simulate AI processing
        setTimeout(() => {
            const portfolio = this.calculateOptimalPortfolio(investmentAmount, riskTolerance, investmentGoals, timeHorizon);
            this.displayPortfolio(portfolio);
            this.calculateRiskMetrics(portfolio);
            this.generatePortfolioAnalysis(portfolio);

            // Reset button
            generateBtn.innerHTML = originalText;
            generateBtn.disabled = false;

            // Show results with animation
            const resultDiv = document.getElementById('portfolioResult');
            resultDiv.classList.remove('hidden');
            resultDiv.classList.add('animate-fade-in');

            // Show success notification
            this.showNotification('Portfolio generated successfully! 🎉');
        }, 3000);
    }

    calculateOptimalPortfolio(amount, risk, goals, timeHorizon) {
        const sectorAllocations = this.getSectorAllocations(risk, goals, timeHorizon);
        const stocks = this.getStockRecommendations();

        const portfolio = {
            totalValue: amount,
            allocations: [],
            expectedReturn: 0,
            expectedVolatility: 0,
            sharpeRatio: 0
        };

        Object.entries(sectorAllocations).forEach(([sector, percentage]) => {
            const allocation = {
                sector: sector,
                percentage: percentage,
                amount: (amount * percentage / 100).toFixed(2),
                stocks: stocks[sector] || [],
                expectedReturn: this.getSectorReturn(sector, risk),
                volatility: this.getSectorVolatility(sector)
            };
            portfolio.allocations.push(allocation);
        });

        // Calculate portfolio metrics
        portfolio.expectedReturn = this.calculateExpectedReturn(portfolio.allocations);
        portfolio.expectedVolatility = this.calculatePortfolioVolatility(portfolio.allocations);
        portfolio.sharpeRatio = (portfolio.expectedReturn - 2.5) / portfolio.expectedVolatility; // Assuming 2.5% risk-free rate

        this.portfolioData = portfolio;
        return portfolio;
    }

    getSectorAllocations(risk, goals, timeHorizon) {
        const baseAllocations = {
            'Technology': 25,
            'Healthcare': 15,
            'Financial Services': 12,
            'Consumer Discretionary': 10,
            'Industrials': 8,
            'Energy': 6,
            'Materials': 5,
            'Utilities': 4,
            'Real Estate': 4,
            'Consumer Staples': 6,
            'Telecommunications': 3,
            'Bonds': 2
        };

        // Adjust based on risk tolerance
        if (risk <= 3) {
            baseAllocations['Bonds'] += 15;
            baseAllocations['Utilities'] += 10;
            baseAllocations['Consumer Staples'] += 8;
            baseAllocations['Technology'] -= 20;
            baseAllocations['Energy'] -= 3;
        } else if (risk >= 8) {
            baseAllocations['Technology'] += 15;
            baseAllocations['Healthcare'] += 5;
            baseAllocations['Consumer Discretionary'] += 5;
            baseAllocations['Bonds'] -= 15;
            baseAllocations['Utilities'] -= 10;
        }

        // Adjust based on goals
        if (goals === 'income') {
            baseAllocations['Utilities'] += 8;
            baseAllocations['Real Estate'] += 6;
            baseAllocations['Consumer Staples'] += 4;
            baseAllocations['Technology'] -= 10;
            baseAllocations['Consumer Discretionary'] -= 8;
        } else if (goals === 'growth') {
            baseAllocations['Technology'] += 12;
            baseAllocations['Healthcare'] += 6;
            baseAllocations['Consumer Discretionary'] += 4;
            baseAllocations['Utilities'] -= 10;
            baseAllocations['Bonds'] -= 12;
        }

        // Adjust for selected sectors
        if (this.selectedSectors.size > 0) {
            const boost = Math.min(15, 60 / this.selectedSectors.size);
            const sectorMapping = {
                'technology': 'Technology',
                'healthcare': 'Healthcare',
                'finance': 'Financial Services',
                'energy': 'Energy',
                'consumer': 'Consumer Discretionary',
                'utilities': 'Utilities',
                'materials': 'Materials',
                'realestate': 'Real Estate'
            };

            this.selectedSectors.forEach(sector => {
                const mappedSector = sectorMapping[sector];
                if (mappedSector && baseAllocations[mappedSector]) {
                    baseAllocations[mappedSector] += boost;
                }
            });
        }

        // Normalize to 100%
        const total = Object.values(baseAllocations).reduce((sum, val) => sum + val, 0);
        Object.keys(baseAllocations).forEach(sector => {
            baseAllocations[sector] = Math.round((baseAllocations[sector] / total) * 100);
        });

        return baseAllocations;
    }

    getStockRecommendations() {
        return {
            'Technology': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'],
            'Healthcare': ['JNJ', 'PFE', 'UNH', 'ABBV', 'MRK', 'TMO', 'ABT'],
            'Financial Services': ['JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'AXP'],
            'Consumer Discretionary': ['AMZN', 'TSLA', 'HD', 'MCD', 'NKE', 'SBUX', 'TGT'],
            'Industrials': ['BA', 'CAT', 'GE', 'MMM', 'UNP', 'RTX', 'LMT'],
            'Energy': ['XOM', 'CVX', 'COP', 'EOG', 'SLB', 'MPC', 'VLO'],
            'Materials': ['LIN', 'APD', 'ECL', 'DD', 'DOW', 'FCX', 'NEM'],
            'Utilities': ['NEE', 'DUK', 'SO', 'AEP', 'EXC', 'XEL', 'WEC'],
            'Real Estate': ['AMT', 'PLD', 'CCI', 'EQIX', 'PSA', 'O', 'WELL'],
            'Consumer Staples': ['PG', 'KO', 'PEP', 'WMT', 'COST', 'CL', 'KMB'],
            'Telecommunications': ['VZ', 'T', 'TMUS', 'CHTR', 'CMCSA'],
            'Bonds': ['AGG', 'BND', 'TLT', 'IEF', 'SHY', 'TIP', 'LQD']
        };
    }

    getSectorReturn(sector, risk) {
        const baseReturns = {
            'Technology': 12.5,
            'Healthcare': 10.2,
            'Financial Services': 9.8,
            'Consumer Discretionary': 11.1,
            'Industrials': 8.9,
            'Energy': 7.5,
            'Materials': 8.2,
            'Utilities': 6.8,
            'Real Estate': 8.5,
            'Consumer Staples': 7.2,
            'Telecommunications': 6.5,
            'Bonds': 3.2
        };

        const riskAdjustment = (risk - 5) * 0.5;
        return (baseReturns[sector] || 8.0) + riskAdjustment;
    }

    getSectorVolatility(sector) {
        const volatilities = {
            'Technology': 22.5,
            'Healthcare': 16.8,
            'Financial Services': 19.2,
            'Consumer Discretionary': 18.7,
            'Industrials': 17.1,
            'Energy': 25.3,
            'Materials': 20.4,
            'Utilities': 12.8,
            'Real Estate': 15.6,
            'Consumer Staples': 13.2,
            'Telecommunications': 14.7,
            'Bonds': 4.2
        };

        return volatilities[sector] || 18.0;
    }

    calculateExpectedReturn(allocations) {
        return allocations.reduce((total, allocation) => {
            return total + (allocation.expectedReturn * allocation.percentage / 100);
        }, 0);
    }

    calculatePortfolioVolatility(allocations) {
        // Simplified volatility calculation (in practice, would use correlation matrix)
        const weightedVolatility = allocations.reduce((total, allocation) => {
            const weight = allocation.percentage / 100;
            return total + (weight * weight * allocation.volatility * allocation.volatility);
        }, 0);

        return Math.sqrt(weightedVolatility);
    }

    displayPortfolio(portfolio) {
        const container = document.getElementById('allocationChart');
        container.innerHTML = '';

        portfolio.allocations
            .filter(allocation => allocation.percentage > 0)
            .sort((a, b) => b.percentage - a.percentage)
            .forEach(allocation => {
                const item = document.createElement('div');
                item.className = 'allocation-item';

                const topStocks = allocation.stocks.slice(0, 3).join(', ');

                item.innerHTML = `
                    <div class="allocation-header">
                        <div class="allocation-sector">${allocation.sector}</div>
                        <div class="allocation-amount">$${allocation.amount}</div>
                    </div>
                    <div class="allocation-percentage">${allocation.percentage}% of portfolio</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${allocation.percentage}%"></div>
                    </div>
                    <div class="allocation-stocks">Top holdings: ${topStocks}</div>
                `;

                container.appendChild(item);
            });
    }

    calculateRiskMetrics(portfolio) {
        const metrics = {
            sharpeRatio: portfolio.sharpeRatio.toFixed(2),
            beta: (0.8 + Math.random() * 0.4).toFixed(2),
            maxDrawdown: (Math.random() * 15 + 5).toFixed(1),
            var95: (portfolio.expectedVolatility * 1.65).toFixed(1),
            diversificationRatio: (0.7 + Math.random() * 0.25).toFixed(2)
        };

        const container = document.getElementById('riskMetrics');
        container.innerHTML = `
            <div class="metric-card">
                <div class="metric-value">${metrics.sharpeRatio}</div>
                <div class="metric-label">Sharpe Ratio</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${metrics.beta}</div>
                <div class="metric-label">Beta</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${metrics.maxDrawdown}%</div>
                <div class="metric-label">Max Drawdown</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${metrics.var95}%</div>
                <div class="metric-label">VaR (95%)</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${metrics.diversificationRatio}</div>
                <div class="metric-label">Diversification</div>
            </div>
        `;
    }

    generatePortfolioAnalysis(portfolio) {
        const analyses = [
            `Your portfolio shows a ${portfolio.expectedReturn.toFixed(1)}% expected annual return with ${portfolio.expectedVolatility.toFixed(1)}% volatility. The Sharpe ratio of ${portfolio.sharpeRatio.toFixed(2)} indicates ${portfolio.sharpeRatio > 1 ? 'excellent' : portfolio.sharpeRatio > 0.5 ? 'good' : 'moderate'} risk-adjusted returns.`,

            `The allocation emphasizes ${portfolio.allocations[0].sector.toLowerCase()} (${portfolio.allocations[0].percentage}%) and ${portfolio.allocations[1].sector.toLowerCase()} (${portfolio.allocations[1].percentage}%), providing ${portfolio.allocations[0].percentage + portfolio.allocations[1].percentage > 40 ? 'concentrated' : 'balanced'} sector exposure.`,

            `Based on your risk tolerance and time horizon, this portfolio targets ${portfolio.expectedReturn < 8 ? 'conservative' : portfolio.expectedReturn < 12 ? 'moderate' : 'aggressive'} growth with ${portfolio.allocations.length} diversified holdings across multiple sectors.`,

            `The portfolio's beta of approximately ${(0.8 + Math.random() * 0.4).toFixed(2)} suggests ${(0.8 + Math.random() * 0.4) > 1 ? 'higher' : 'lower'} volatility compared to the overall market, aligning with your risk preferences.`
        ];

        document.getElementById('aiPortfolioAnalysis').innerHTML = analyses.join('<br><br>');
    }

    runBacktest() {
        const years = [1, 2, 3, 5, 10];
        const container = document.getElementById('backtestSummary');

        container.innerHTML = '<p>Running historical backtest...</p>';

        setTimeout(() => {
            const results = years.map(year => {
                const annualReturn = 6 + Math.random() * 8;
                const volatility = 12 + Math.random() * 8;
                const maxDrawdown = Math.random() * 15 + 5;

                return {
                    period: `${year} Year${year > 1 ? 's' : ''}`,
                    return: annualReturn.toFixed(1),
                    volatility: volatility.toFixed(1),
                    maxDrawdown: maxDrawdown.toFixed(1),
                    sharpe: (annualReturn / volatility).toFixed(2)
                };
            });

            container.innerHTML = results.map(result => `
                <div class="backtest-metric">
                    <div class="backtest-value">${result.return}%</div>
                    <div class="backtest-label">${result.period} Return</div>
                </div>
            `).join('');
        }, 2000);
    }

    generateRebalancingSuggestions() {
        const suggestions = [
            {
                action: 'Reduce Technology Allocation',
                reason: 'Technology sector is overweight by 3.2% compared to target allocation'
            },
            {
                action: 'Increase Healthcare Exposure',
                reason: 'Healthcare sector showing strong defensive characteristics in current market'
            },
            {
                action: 'Rebalance International Holdings',
                reason: 'International allocation has drifted below target due to currency fluctuations'
            },
            {
                action: 'Trim High-Performing Assets',
                reason: 'Take profits from top performers to maintain target allocation'
            }
        ];

        const container = document.getElementById('rebalancingSuggestions');
        container.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item">
                <div class="suggestion-action">${suggestion.action}</div>
                <div class="suggestion-reason">${suggestion.reason}</div>
            </div>
        `).join('');
    }

    toggleChatbot() {
        //Remove Chatbot functionality
        //const chatbot = document.getElementById('chatbotWindow');
        //chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';

        //if (chatbot.style.display === 'flex') {
        //    document.getElementById('chatInput').focus();
        //}
    }

    sendMessage() {
        //Remove Chatbot Functionality
        //const input = document.getElementById('chatInput');
        //const message = input.value.trim();

        //if (!message) return;

        //this.addMessage(message, 'user');
        //input.value = '';

        // Simulate AI response
        //setTimeout(() => {
        //    const response = this.generateAIResponse(message);
        //    this.addMessage(response, 'ai');
        //}, 1000);
    }

    addMessage(text, sender) {
        //Remove Chatbot Functionality
        //const container = document.getElementById('chatbotMessages');
        //const message = document.createElement('div');
        //message.className = `message ${sender}`;
        //message.innerHTML = `<p>${text}</p>`;
        //container.appendChild(message);
        //container.scrollTop = container.scrollHeight;
    }

    generateAIResponse(userMessage) {
        //Remove Chatbot Functionality
        //const message = userMessage.toLowerCase();

        //if (message.includes('portfolio') || message.includes('allocation')) {
        //    return "I can help you optimize your portfolio allocation based on your risk tolerance and investment goals. Would you like me to analyze your current portfolio or suggest improvements?";
        //}

        //if (message.includes('risk')) {
        //    return "Risk management is crucial for long-term investment success. I recommend diversifying across asset classes and regularly rebalancing your portfolio. What's your current risk tolerance level?";
        //}

        //if (message.includes('market') || message.includes('stock')) {
        //    return "Current market conditions show mixed signals with technology stocks leading gains while defensive sectors provide stability. I'm monitoring 500+ stocks in real-time to provide you with the best investment opportunities.";
        //}

        //if (message.includes('diversification') || message.includes('diversify')) {
        //    return "Diversification is key to reducing portfolio risk. I recommend spreading investments across at least 8-10 different sectors and including both domestic and international exposure. Your current portfolio shows good diversification across major sectors.";
        //}

        //if (message.includes('ai') || message.includes('artificial intelligence')) {
        //    return "I use advanced machine learning algorithms to analyze market patterns, sentiment data, and economic indicators. This helps me provide personalized investment recommendations and real-time portfolio optimization suggestions.";
        //}

        //if (message.includes('performance') || message.includes('return')) {
        //    return "Historical performance shows that diversified portfolios typically generate 7-12% annual returns over long periods. However, past performance doesn't guarantee future results. I can run backtests on your specific portfolio allocation.";
        //}

        //return "I'm your AI investment advisor, ready to help with portfolio optimization, risk analysis, market insights, and investment strategies. What specific aspect of investing would you like to discuss?";
    }

    createPerformanceChart() {
        const ctx = document.getElementById('performanceChart').getContext('2d');

        // Generate sample data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const portfolioData = months.map((_, i) => 10000 * Math.pow(1.08, i/12) + (Math.random() - 0.5) * 500);
        const marketData = months.map((_, i) => 10000 * Math.pow(1.06, i/12) + (Math.random() - 0.5) * 800);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Your Portfolio',
                    data: portfolioData,
                    borderColor: '#FFD700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'S&P 500',
                    data: marketData,
                    borderColor: '#00D4FF',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Portfolio Performance vs Market',
                        color: '#FFD700'
                    },
                    legend: {
                        labels: {
                            color: '#FFFFFF'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#B3B3B3'
                        },
                        grid: {
                            color: '#333333'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#B3B3B3',
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        },
                        grid: {
                            color: '#333333'
                        }
                    }
                }
            }
        });
    }

    exportToPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text('Fundamental Investment Portfolio Report', 20, 20);

        doc.setFontSize(12);
        doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 40);

        if (this.portfolioData) {
            doc.text('Portfolio Summary:', 20, 60);
            doc.text(`Total Investment: $${this.portfolioData.totalValue.toLocaleString()}`, 20, 80);
            doc.text(`Expected Return: ${this.portfolioData.expectedReturn.toFixed(1)}%`, 20, 100);
            doc.text(`Expected Volatility: ${this.portfolioData.expectedVolatility.toFixed(1)}%`, 20, 120);
            doc.text(`Sharpe Ratio: ${this.portfolioData.sharpeRatio.toFixed(2)}`, 20, 140);

            doc.text('Asset Allocation:', 20, 170);
            let yPos = 190;
            this.portfolioData.allocations.forEach(allocation => {
                if (allocation.percentage > 0) {
                    doc.text(`${allocation.sector}: ${allocation.percentage}% ($${allocation.amount})`, 20, yPos);
                    yPos += 20;
                }
            });
        }

        doc.save('fundamental_portfolio_report.pdf');
    }

    exportToExcel() {
        if (!this.portfolioData) {
            alert('Please generate a portfolio first');
            return;
        }

        const data = this.portfolioData.allocations.map(allocation => ({
            Sector: allocation.sector,
            Percentage: allocation.percentage + '%',
            Amount: '$' + allocation.amount,
            'Expected Return': allocation.expectedReturn.toFixed(1) + '%',
            Volatility: allocation.volatility.toFixed(1) + '%'
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Portfolio');

        XLSX.writeFile(wb, 'fundamental_portfolio.xlsx');
    }

    exportToCSV() {
        if (!this.portfolioData) {
            alert('Please generate a portfolio first');
            return;
        }

        const csvContent = [
            ['Sector', 'Percentage', 'Amount', 'Expected Return', 'Volatility'],
            ...this.portfolioData.allocations.map(allocation => [
                allocation.sector,
                allocation.percentage + '%',
                '$' + allocation.amount,
                allocation.expectedReturn.toFixed(1) + '%',
                allocation.volatility.toFixed(1) + '%'
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fundamental_portfolio.csv';
        a.click();
        URL.revokeObjectURL(url);
    }

    showLoadingProgress() {
        const steps = [
            'Analyzing market conditions...',
            'Calculating optimal allocations...',
            'Running risk assessments...',
            'Generating AI recommendations...',
            'Finalizing portfolio...'
        ];

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                console.log(steps[currentStep]);
                currentStep++;
            } else {
                clearInterval(interval);
            }
        }, 600);
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification show';
        notification.innerHTML = message;
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }
}

// Global functions for HTML event handlers
function switchTab(tabName) {
    platform.switchTab(tabName);
}

function generateAIRecommendations() {
    platform.generateAIRecommendations();
}

function generatePortfolio() {
    platform.generatePortfolio();
}

function runBacktest() {
    platform.runBacktest();
}

function toggleChatbot() {
    platform.toggleChatbot();
}

function sendMessage() {
    platform.sendMessage();
}

function exportToPDF() {
    platform.exportToPDF();
}

function exportToExcel() {
    platform.exportToExcel();
}

function exportToCSV() {
    platform.exportToCSV();
}

function closeModal(modalId) {
    platform.closeModal(modalId);
}

// Initialize the platform
const platform = new FundamentalPlatform();

// Initialize performance chart after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        platform.createPerformanceChart();
        platform.generateRebalancingSuggestions();
    }, 3000);
});
