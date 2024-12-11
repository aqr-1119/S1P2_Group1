document.addEventListener('DOMContentLoaded', () => {
    const tier1Dropdown = document.getElementById('tier1');
    const tier2Dropdown = document.getElementById('tier2');
    const tier1Details = document.getElementById('tier1-details');
    const tier2Details = document.getElementById('tier2-details');

    function getTierTemplate(tier) {
        const template = document.getElementById(`tier-${tier}`);
        return template ? template.innerHTML : "";
    }

    function renderTierDetails(tier, container) {
        const content = getTierTemplate(tier);
        if (content) {
            container.innerHTML = content;
        }
    }

    tier1Dropdown.addEventListener("change", () => renderTierDetails(tier1Dropdown.value, tier1Details));
    tier2Dropdown.addEventListener("change", () => renderTierDetails(tier2Dropdown.value, tier2Details));

    renderTierDetails(tier1Dropdown.value, tier1Details);
    renderTierDetails(tier2Dropdown.value, tier2Details);
});
