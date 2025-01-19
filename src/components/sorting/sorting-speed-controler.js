export const SortingSpeedController = ({ min = 20, max = 800, step = 1, value, handleChange, isDisabled = false }) => {
    return (
        <div className="flex gap-2 items-center justify-center">
            <span className="text-center text-gray-300">Slow</span>
            <input
                disabled={isDisabled}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => handleChange(e)}
                className="w-full h-2 rounded-lg appearance-none cursor-none bg-gray-700"
            />
            <span className="text-center text-gray-300">Fast</span>
        </div>
    );
};