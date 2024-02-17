class SSRArticle {
    parse() {
        return `
        <div class="hub__article-tile">
            <div class="hub__article-tile-description">
            <span class="hub__article-title"> How closures can change the world... or at least change your code</span>
            <div class="hub__article-buttons">
                <div class="hub__article-button">
                <div class="hub__article-button-icon">
                    <i class="gg-heart"></i>
                </div>

                <span class="hub__article-button-value">@@valuePlaceholder@@</span>
                </div>
                <div class="hub__article-button">
                <div class="hub__article-button-icon">
                    <i class="gg-comment"></i>
                </div>
                <span class="hub__article-button-value">@@valuePlaceholder@@</span>
                </div>
            </div>
            </div>
        </div>
        `
    }
}

module.exports = { SSRArticle };